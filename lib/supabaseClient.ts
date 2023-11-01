import { createClient } from "@supabase/supabase-js";
import { Database } from "./schema";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const submitSotd = (song: any, description: string) => {
  console.debug("Enter submission");
  if (!description) {
    alert("You didn't add a description bucko");
    return;
  }
  supabase
    .from("sotd")
    .insert({
      name: song.name,
      description: description,
      album: song.album,
      album_art: song.album_art,
      preview_url: song.preview_url,
      spotify_id: song.spotify_id,
      artists: song.artists,
    })
    .throwOnError()
    .then((res) => {
      if (res.error) {
        alert("There was an issue during sotd save");
      } else {
        alert("Nice song");
        console.debug(res);
      }
    });
  console.debug("Finish submission");
};

//@ts-ignore
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
