import { NextApiRequest, NextApiResponse } from "next";
import { logError, logNeutral, logSuccess } from "../../lib/common";
import { sectors } from "../../lib/constants";

import {
  fetchAccessToken,
  getCurrentToken,
  refreshToken,
  resetCache,
  topTenFetcher,
} from "../../lib/spotify";

/**
 * @function spotifyFetch
 * @remarks Controller for `/api/music`
 * @link https://nextjs.org/docs/api-routes/introduction
 */
const spotifyFetch = (req: NextApiRequest, res: NextApiResponse) => {
  console.debug("Request Body");
  console.debug(req.body);
  logNeutral(sectors.generalApi, "Spotify Request", req.body);

  let { created_at, expires_in, access_token } = getCurrentToken();
  created_at.setSeconds(created_at.getSeconds() + expires_in);
  console.debug(
    `New Date's seconds ${new Date().getSeconds()}, vs fetched seconds ${created_at}`
  );

  const isExpired = new Date() > created_at;
  console.debug(`isExpired - ${isExpired}`);

  if (req.method === "GET" && req.body.code) {
    // Get initial token
    if (isExpired) {
      res.status(401).json({
        status: 401,
        error: "Expired Token",
        message: "You're authorized token has expired",
      });
      resetCache();
      res.redirect("/admin");
    } else {
      logSuccess(sectors.apiSpotify, "Successful spotify token request");
      const topTen = topTenFetcher(access_token);
      res.status(200).json(topTen);
      res.end();
    }
  } else {
    // Something went wrong I guess
    logError(sectors.generalApi, `Bad request on - ${req.url}`, {
      method: req.method,
      body: req.body,
    });

    res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: "You must've done something egregious. Don't do it again.",
    });
    res.end();
  }
};

export default spotifyFetch;
