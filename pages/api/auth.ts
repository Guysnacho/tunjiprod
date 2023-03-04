import { NextApiRequest, NextApiResponse } from "next";
import { urls } from "../../lib/constants";
import { supabase } from "../../lib/supabaseClient";

const spotifyAuth = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.request_id !== null && req.method === "POST") {
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      body: JSON.stringify({
        grant_type: "authorization_code",
        code: req.body.code,
        redirect_uri:
          process.env.NODE_ENV == "development" ? urls.DEVURL : urls.PRODURL,
      }),
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
              ":" +
              process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
      },
    })
      .then((response) => {
        supabase.from("logs").insert({
          status: 1,
          sector: "API - Spotify",
          message: `Successful spotify token request`,
          data: response.body,
        });
        res.json(response.body);
      })
      .catch((err) =>
        supabase.from("logs").insert({
          status: 2,
          sector: "API - Spotify",
          message: "Unsuccessful spotify token request",
          data: err.message,
        })
      );
  } else {
    supabase
      .from("logs")
      .insert({
        status: 2,
        sector: "API",
        message: `Bad request on - ${req.url}`,
        data: {
          method: req.method,
          body: req.body,
        },
      })
      .then(() => res.json({ message: "Bad request" }));
  }
};

export default spotifyAuth;
