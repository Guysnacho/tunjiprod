import {
  PaymentBody,
  PaymentHandlerType,
} from "@/components/dashboard/PaymentHandler";
import { isPresent } from "@/lib";
import { findPriceByTier } from "@/lib/stripe";
import createClient from "@/lib/supabase/service";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import { Stripe } from "stripe";

/**
 * Request embedded form using params
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentBody;

    if (!isValidSessionCreateBody(body))
      return Response.json({}, { status: 400 });

    const tier = body.tier as PaymentHandlerType;
    const isMemberOnly = tier?.startsWith("member_only_") ?? false;
    const baseTier = isMemberOnly
      ? tier!.replace("member_only_", "")
      : tier ?? "student";

    const price = await findPriceByTier(baseTier, isMemberOnly);

    if (!price || !price.id) {
      return Response.json(
        { message: "No matching product found for the selected tier" },
        { status: 404 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      allow_promotion_codes: true,
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${req.headers.get("origin")}/payment/{CHECKOUT_SESSION_ID}`,
      customer_email: body.email,
      customer_creation: "if_required",
      metadata: {
        userId: body.userId!,
        email: body.email!,
        fname: body.fname!,
        lname: body.lname!,
        institution: body.institution!,
        tier: price.tier || "student",
        memberOnly: price.memberOnly!,
      },
    });

    return Response.json({ clientSecret: session.client_secret });
  } catch (err) {
    return Response.json(
      // @ts-expect-error should be an error message somewhere
      { message: err.message },
      {
        status: 500,
      },
    );
  }
}

/**
 * Fetch session result on confirmation page
 * @param req
 * @returns
 */
export async function GET(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const session = await stripe.checkout.sessions.retrieve(
      req.headers.get("session_id")!,
    );

    if (session.status === "complete") {
      console.log(
        session!.metadata!.userId
          ? `Payment completed for user ${session!.metadata!.userId}!`
          : `Payment completed for an unauthenticated user - ${session.metadata!.fname} ${session.metadata!.lname}!`,
      );
      const client = createClient();
      if (session && session.metadata && session.metadata["userId"]) {
        console.log("Updated authed user");
        await handleUpdate(client, session);
        console.log(
          `Table update complete | user_role=${
            session.metadata.tier
          } | user_id=${session.metadata.userId} | member_only=${
            session.metadata.memberOnly
          }`,
        );
      } else {
        console.log("Handling unauthenticated registration update");
        await handleRawUpdate(client, session);
      }
    }

    return Response.json(
      {
        status: session.status,
        customer_email: session!.customer_details!.email,
      },
      {
        status: 201,
      },
    );
  } catch (err) {
    return Response.json(
      // @ts-expect-error should be an error message somewhere
      { message: err.message },
      {
        status: 500,
      },
    );
  }
}

/**
 * Retroactively update user with institution
 * @param req
 * @returns
 */
export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentBody;
    console.log(body);
    if (isValidUpdateBody(body)) {
      const client = createClient();
      return await handleInstitutionUpdate(client, body)
        .then(() => Response.json({}, { status: 201 }))
        .catch((err) =>
          Response.json({ message: err.message }, { status: 500 }),
        );
    } else {
      return Response.json({}, { status: 400 });
    }
  } catch (err) {
    return Response.json(
      // @ts-expect-error should be an error message somewhere
      { message: err.message },
      {
        status: 500,
      },
    );
  }
}

/**
 * Update user's role and payment date in DB
 * @param client
 * @param session
 */
async function handleUpdate(
  client: SupabaseClient<Database>,
  session: Stripe.Response<Stripe.Checkout.Session>,
) {
  const { data, error } = await client
    .from("member")
    .update({
      fees_paid_at: new Date().toISOString(),
      role: session!.metadata!.tier as Database["public"]["Enums"]["user_role"],
      institution: session!.metadata!.institution,
    })
    .eq("user_id", session!.metadata!.userId)
    .eq("org_id", process.env.NEXT_PUBLIC_ORG_ID)
    .select("user_id")
    .maybeSingle();

  if (error) {
    console.error(error.message);
    return;
  }

  const { error: appendError } = await client.rpc(
    "append_current_year_to_attended",
    {
      target_user: data!.user_id,
    },
  );

  if (appendError) {
    console.error(appendError.message);
    return;
  }

  console.log(`Successfully updated attendee year for user=${data?.user_id}`);
}

/**
 * Take note of unauthed registration
 * @param client
 * @param session
 */
async function handleRawUpdate(
  client: SupabaseClient<Database>,
  session: Stripe.Response<Stripe.Checkout.Session>,
) {
  console.log("Recording unauthenticated registration");
  await client.from("raw_registration").upsert(
    {
      org_id: process.env.NEXT_PUBLIC_ORG_ID,
      email: session.metadata!.email,
      fname: session.metadata!.fname,
      lname: session.metadata!.lname,
      institution: session!.metadata!.institution,
      created_at: new Date().toISOString(),
      role: session!.metadata!.tier as Database["public"]["Enums"]["user_role"],
    },
    {
      ignoreDuplicates: false,
    },
  );
}

/**
 * Take note of unauthed registration
 * @param client
 * @param body
 */
async function handleInstitutionUpdate(
  client: SupabaseClient<Database>,
  body: PaymentBody,
) {
  console.log("Recording unauthenticated registration");
  const { data, error } = await client
    .from("raw_registration")
    .upsert({
      org_id: process.env.NEXT_PUBLIC_ORG_ID,
      email: body.email!,
      fname: body.fname!,
      lname: body.lname!,
      institution: body.institution,
      created_at: new Date().toISOString(),
      role: body.tier as Database["public"]["Enums"]["user_role"],
    })
    .select();
  if (error || !data || data.length == 0) {
    console.error(
      "Issue updating unauthenticated registration - ",
      error?.message || "Upsert failed",
    );
    throw new Error(
      "Issue updating unauthenticated registration - " + error?.message || "Upsert failed",
    );
  } else {
    console.log("Successfully updated registration for user - ", data);
  }
}

/**
 * Is a valid update request
 * @param body
 */
function isValidUpdateBody(body: PaymentBody) {
  return (
    isPresent(body.email) &&
    isPresent(body.fname) &&
    isPresent(body.lname) &&
    (body.tier satisfies PaymentBody["tier"]) &&
    isPresent(body.institution)
  );
}

/**
 * Is a valid update request
 * @param body
 */
function isValidSessionCreateBody(body: PaymentBody) {
  return (
    ((isPresent(body.fname) &&
      isPresent(body.lname) &&
      isPresent(body.institution)) ||
      isPresent(body.userId)) &&
    isPresent(body.email) &&
    (body.tier satisfies PaymentBody["tier"])
  );
}
