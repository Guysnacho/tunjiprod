import { createClient } from "@supabase/supabase-js";
import { Song } from "../components/individual/Single";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const submitSotd = (song: Song) => {
  console.debug("Enter submission");
  supabase
    .from("sotd")
    .insert(song)
    .then((res) => {
      console.debug("Response");
      console.debug(res);
    });
  console.debug("Finish submission");
};

//@ts-ignore
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
