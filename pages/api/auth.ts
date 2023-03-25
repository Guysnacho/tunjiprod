import { NextApiRequest, NextApiResponse } from "next";
import { logError, logNeutral, logSuccess } from "../../lib/common";
import { sectors, urls } from "../../lib/constants";

import axios, { AxiosError } from "axios";
import { supabase } from "../../lib/supabaseClient";
import { format, parse } from "date-fns";

/**
 * @function spotifyAuth
 * @remarks Controller for `/api/auth`
 * @link https://nextjs.org/docs/api-routes/introduction
 */
const spotifyAuth = (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Request Body");
  console.log(req.body);
  logNeutral(sectors.generalApi, "Auth Request", req.body);

  const { created_at, expires_in, access_token, refresh_token } =
    getCurrentToken();
  console.log(
    `New Date's seconds ${new Date().getSeconds()}, vs fetched seconds ${
      created_at.getSeconds() + expires_in
    }`
  );
  const isExpired =
    new Date().toLocaleString() >
    created_at
      .setSeconds(created_at.getSeconds() + expires_in)
      .toLocaleString();

  console.log(`isExpired - ${isExpired}`);

  if (req.method === "POST" && req.body.code) {
    // Get initial token
    if (isExpired) {
      if (refresh_token) {
        logNeutral(sectors.apiSpotify, "Fetching refresh token", req.body);
        refreshToken(refresh_token, res);
      } else {
        logNeutral(sectors.apiSpotify, "Fetching token", req.body);
        fetchAccessToken(req.body.code, res);
      }
    } else {
      logSuccess(sectors.apiSpotify, "Successful spotify token request");
      res.status(200).json({
        access_token: access_token,
      });
      res.end();
    }
  } else {
    // Something went wrong I guess
    logError(sectors.generalApi, `Bad request on - ${req.url}`, {
      method: req.method,
      body: req.body,
    });

    res.status(400).json({ error: "Bad request" });
    res.end();
  }
};

/**
 * @function fetchAccessToken
 * @remarks Fetch auth token using `auth_code`
 * @link https://nextjs.org/docs/api-routes/introduction
 */
const fetchAccessToken = (auth_code: string, res: NextApiResponse) => {
  console.log("Entering token fetch");

  axios
    .post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        code: auth_code,
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

      // Save token
      supabase
        .from("token")
        .insert({
          access_token: response.data.access_token,
          token_type: response.data.token_type,
          scope: response.data.scope,
          expires_in: response.data.expires_in,
          refresh_token: response.data.refresh_token,
        })
        .then((res) => {
          logSuccess(sectors.apiSpotify, "Successful spotify token save", {
            status: res.status,
            error: res.error,
            data: res.data,
          });
        });
      logSuccess(sectors.apiSpotify, "Successful spotify token request");
      res.status(200).json(JSON.stringify(response.data));
      res.end();
      // return err.response?.data;
    })
    .catch((err: AxiosError) => {
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
      res.status(400).end(JSON.stringify(err.response?.data));
      res.end();
      // return err.response?.data;
    });
};

/**
 * @function refreshToken
 * @remarks Fetch auth token using `refresh_token`
 * @link https://nextjs.org/docs/api-routes/introduction
 */
const refreshToken = (refresh_token: string, res: NextApiResponse) => {
  console.log("Entering token refresh");

  axios
    .post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh_token,
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

      // Save token
      supabase.from("token").insert({
        access_token: response.data.access_token,
        token_type: response.data.token_type,
        scope: response.data.scope,
        expires_in: response.data.expires_in,
        refresh_token: response.data.refresh_token || "",
      });

      logSuccess(
        sectors.apiSpotify,
        "Successful spotify refresh token request",
        response.data
      );
      res.status(200).json(JSON.stringify(response.data));
      res.end();
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
      res.status(400).json(JSON.stringify(err.response?.data));
      res.end();
      // return response.data;
    });
};

const getCurrentToken = (): {
  created_at: Date;
  expires_in: number;
  access_token: string;
  refresh_token: string;
} => {
  supabase
    .from("token")
    .select("created_at,expires_in,access_token,refresh_token")
    .order("id", { ascending: false })
    .limit(1)
    .single()
    .then(({ data, error, status }) => {
      console.log();
      logSuccess(sectors.supabase, "Last token fetched", data);
      if (data) {
        return {
          created_at: parse(
            data.created_at,
            "yyyy-MM-dd HH:mm:ssTSSx",
            new Date()
          ),
          expires_in: data.expires_in,
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        };
      } else {
        logError(sectors.apiSpotify, "No prior access_token", {
          status: status,
          errorCode: error?.code,
          errorMessage: error?.message,
          details: error?.details,
        });
        return {
          created_at: new Date(),
          expires_in: 0,
          access_token: "",
          refresh_token: "",
        };
      }
    });

  logError(sectors.apiSpotify, "No results from supabase");
  return {
    created_at: new Date(),
    expires_in: 0,
    access_token: "",
    refresh_token: "",
  };
};

export default spotifyAuth;
