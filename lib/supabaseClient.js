import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_DBURL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_DBKEY;

export const supabase =
  createClient (supabaseUrl, supabaseAnonKey);
