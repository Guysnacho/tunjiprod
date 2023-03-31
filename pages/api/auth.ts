import { NextApiRequest, NextApiResponse } from "next";
import { logError, logNeutral, logSuccess } from "../../lib/common";
import { sectors } from "../../lib/constants";

import {
  fetchAccessToken,
  getCurrentToken,
  refreshToken,
} from "../../lib/spotify";

/**
 * @function spotifyAuth
 * @remarks Controller for `/api/auth`
 * @link https://nextjs.org/docs/api-routes/introduction
 */
const spotifyAuth = (req: NextApiRequest, res: NextApiResponse) => {
  console.debug("Request Body");
  console.debug(req.body);
  logNeutral(sectors.generalApi, "Auth Request", req.body);

  let { created_at, expires_in, access_token, refresh_token } =
    getCurrentToken();
  created_at.setSeconds(created_at.getSeconds() + expires_in);
  console.debug(
    `New Date's seconds ${new Date()}, vs fetched seconds ${created_at}`
  );

  const isExpired = new Date() > created_at;
  console.debug(`isExpired - ${isExpired}`);

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

export default spotifyAuth;
