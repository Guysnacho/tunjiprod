import { NextApiRequest, NextApiResponse } from "next";
import { logError, logSuccess } from "../../lib/common";
import { sectors, urls } from "../../lib/constants";

const spotifyAuth = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST" && req.body.code) {
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
        logSuccess(
          sectors.apiSpotify,
          "Successful spotify token request",
          response.body
        );
        res.json(response.body);
      })
      .catch((err: PromiseRejectedResult) => {
        logError(
          sectors.apiSpotify,
          "Unsuccessful spotify token request",
          err.reason
        );
        res.statusMessage = "Unsuccessful spotify token request";
        res.statusCode = 400;
        res.json(err);
      });
  } else {
    logError(sectors.generalApi, `Bad request on - ${req.url}`, {
      method: req.method,
      body: req.body,
    });
    res.json({ message: "Bad request" });
  }
};

export default spotifyAuth;
