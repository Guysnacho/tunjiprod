import { getActiveProductIds } from "@/lib/stripe";
import { NextRequest } from "next/server";
import { Stripe } from "stripe";

export async function DELETE(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    console.log("starting code delete");
    const body = await req.json();
    console.log(body);
    const code: string | null = body.promo || body.coupon || null;

    console.log("Code recieved - %s", code);
    let reqType: "promo" | "coupon";
    if (!code) {
      return Response.json({}, { status: 400 });
    } else if (body.coupon) {
      reqType = "coupon";
    } else if (body.promo) {
      reqType = "promo";
    } else {
      return Response.json({}, { status: 400 });
    }

    if (reqType === "coupon") {
      console.log("Deleting coupon");
      const data = await stripe.coupons.del(code);
      return Response.json({ id: data.id, deleted: data.deleted });
    } else {
      console.log("Deleting promotion code");
      const data = await stripe.promotionCodes.update(code, {
        active: false,
      });
      console.log("promotion code delete response");
      return Response.json({
        id: data.id,
        active: data.active,
        coupon: data.coupon,
        code: data.code,
      });
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

export async function GET() {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const data = await stripe.promotionCodes.list({
      limit: 100,
      active: true,
    });
    const promo = data.data.map(
      ({
        active,
        code,
        created,
        max_redemptions,
        times_redeemed,
        expires_at,
        coupon,
        id,
      }) => ({
        coupon,
        active,
        promo_code: code,
        promo_id: id,
        created: created * 1000,
        max_redemptions,
        times_redeemed,
        expires_at,
      }),
    );
    return Response.json(promo);
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

export async function POST(req: NextRequest) {
  try {
    console.log("starting code creation");
    const body = await req.json();
    console.log(body);

    const reqType = validateCouponRequest(body);

    if (reqType === "INVALID") return Response.json({}, { status: 400 });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    if (reqType === "DUPLICATE") {
      console.log("Creating duplicate promo code for coupon");
      const promoResponse = await stripe.promotionCodes.create({
        coupon: body.coupon,
        max_redemptions: 1,
      });
      return Response.json(promoResponse);
    } else {
      // Dynamically fetch active product IDs for coupon
      const productIds = await getActiveProductIds();

      // Create coupon
      const couponResponse = await stripe.coupons.create({
        name: body.couponName,
        percent_off: body.percentage,
        amount_off: body.discount,
        currency: "USD",
        max_redemptions: 1,
        ...(productIds.length > 0
          ? { applies_to: { products: productIds } }
          : {}),
      });

      const promoResponse = await stripe.promotionCodes.create({
        coupon: couponResponse.id,
        max_redemptions: 1,
      });

      return Response.json(promoResponse);
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

const validateCouponRequest = (body: any) => {
  const hasDiscount =
    body.discount != undefined && Number.isInteger(body.discount);
  const hasPercentage =
    body.percentage != undefined && Number.isInteger(body.percentage);
  const hasCoupon = body.coupon != undefined;
  const hasCouponName = body.couponName != undefined;
  if (hasDiscount !== hasPercentage && hasCouponName) {
    return "NEW_COUPON";
  } else if (hasCoupon && !hasDiscount && !hasCouponName) {
    return "DUPLICATE";
  } else {
    return "INVALID";
  }
};
