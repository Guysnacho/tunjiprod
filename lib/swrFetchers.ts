import { SupabaseClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { Database } from "./supabase/types";

export const authFetcher = async (client: SupabaseClient<Database>) => {
  // Fetch data from external API
  const { data: token } = await client.auth.getClaims();
  const { data } = await client
    .from("member")
    .select("*")
    .eq("user_id", token!.claims.sub)
    .single();
  const { data: videos } = await client
    .from("videos")
    .select("*")
    .order("date", { ascending: false });
  const user = await client.auth.getUser();

  if (data) {
    if (videos) {
      return { user: { ...data, email: user.data.user?.email }, videos };
    }
    return { user: { ...data, email: user.data.user?.email }, videos: [] };
  }
  return { user: undefined, videos: [] };
};

export const couponFetcher = async (): Promise<CouponList> => {
  const data = await fetch("/admin");
  return await data.json();
};

export const registrationFetcher = async (client: SupabaseClient<Database>) => {
  const { data } = await client
    .from("raw_registration")
    .select(`fname, lname, role, email, institution`)
    .eq("org_id", process.env.NEXT_PUBLIC_ORG_ID)
    .throwOnError();

  return data;
};

export const memberRegistrationFetcher = async (
  client: SupabaseClient<Database>,
) => {
  const now = new Date();
  const { data } = await client
    .from("member")
    .select(`*`)
    .eq("org_id", process.env.NEXT_PUBLIC_ORG_ID)
    .contains("attended", [now.getFullYear().toString()])
    .throwOnError();

  return data;
};

type CouponList = {
  coupon: Stripe.Coupon;
  active: boolean;
  promo_code: string;
  promo_id: string;
  created: number;
  max_redemptions: number | null;
  times_redeemed: number;
  expires_at: number | null;
}[];

export type Registration = {
  fname: string;
  lname: string;
  role: "professional" | "student" | "admin" | "postdoctorial";
  email: string;
  institution: string;
};
