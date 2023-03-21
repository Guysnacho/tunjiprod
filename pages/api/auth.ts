import { NextApiRequest, NextApiResponse } from "next";
import { logError, logNeutral, logSuccess } from "../../lib/common";
import { sectors, urls } from "../../lib/constants";

import axios, { AxiosError } from "axios";

const spotifyAuth = (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Request Body");
  console.log(req.body);
  logNeutral(sectors.generalApi, "Auth Request", req.body);

  if (req.method === "POST" && req.body.code) {
    // Get initial token
    logNeutral(sectors.apiSpotify, "Fetching token", req.body);
    fetchToken(req, res);
  } else if (req.method === "POST" && req.body.refresh) {
    // Refresh token
    logNeutral(sectors.apiSpotify, "Fetching refresh token", req.body);
    refreshToken(req, res);
  } else {
    // Something went wrong I guess
    logError(sectors.generalApi, `Bad request on - ${req.url}`, {
      method: req.method,
      body: req.body,
    });

    res.status(400).end({ error: "Bad request" });
  }
};

const fetchToken = (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Entering token fetch");

  axios
    .post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        code: req.body.code,
        grant_type: "authorization_code",
        redirect_uri:
          process.env.NODE_ENV == "development" ? urls.DEVURL : urls.PRODURL,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
                ":" +
                process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
            ).toString("base64"),
        },
      }
    )
    .then((response) => {
      console.log("Fetched token");
      console.log(response.data);

      logSuccess(sectors.apiSpotify, "Successful spotify token request");
      res.status(200).end(response.data);
      // return err.response?.data;
    })
    .catch((err: AxiosError) => {
      console.error("Error on fetchToken Post");
      console.error({
        status: err.response?.statusText,
        code: err.response?.status,
        response: err.response?.data,
      });
      logError(
        sectors.apiSpotify,
        "Unsuccessful spotify token request - fetchToken",
        {
          service: "fetchToken",
          reason: {
            status: err.response?.statusText,
            code: err.response?.status,
            response: err.response?.data,
          },
        }
      );
      res.status(400).end(err.response?.data);
      // return err.response?.data;
    });
};

const refreshToken = (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Entering token refresh");

  axios
    .post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: req.body.refresh,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
                ":" +
                process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
            ).toString("base64"),
        },
      }
    )
    .then((response) => {
      console.log("Fetched refresh token");
      console.log(response.data);

      logSuccess(
        sectors.apiSpotify,
        "Successful spotify refresh token request",
        response.data
      );
      res.status(200).end(response.data);
      // return response.data;
    })
    .catch((err: AxiosError) => {
      console.log("Error on refreshToken Post");
      console.error({
        status: err.response?.statusText,
        code: err.response?.status,
        response: err.response?.data,
      });
      logError(
        sectors.apiSpotify,
        "Unsuccessful spotify token request - refreshToken",
        {
          service: "refreshToken",
          reason: {
            status: err.response?.statusText,
            code: err.response?.status,
            response: err.response?.data,
          },
        }
      );
      res.status(400).end(err.response?.data);
      // return response.data;
    });
};

export default spotifyAuth;
