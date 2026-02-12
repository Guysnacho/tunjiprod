import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Database } from "./types";

/**
 * Creates a Supabase client with service role permissions.
 * Use this for API routes that need elevated database access.
 *
 * WARNING: Only use server-side. Never expose service role key to client.
 */
export default function createClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVER_KEY!,
    {
      global: {
        headers: {
          org_id: process.env.NEXT_PUBLIC_ORG_ID,
        },
      },
    },
  );
}
