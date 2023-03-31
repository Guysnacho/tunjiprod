import { NextApiRequest, NextApiResponse } from "next";
import { logError, logNeutral, logSuccess } from "../../lib/common";
import { sectors, urls } from "../../lib/constants";

import { getCurrentToken, resetCache, topTenFetcher } from "../../lib/spotify";

/**
 * @function spotifyFetch
 * @remarks Controller for `/api/music`
 * @link https://nextjs.org/docs/api-routes/introduction
 */
const spotifyFetch = (req: NextApiRequest, res: NextApiResponse) => {
  console.debug("Request Body");
  console.debug(req.body);
  logNeutral(sectors.generalApi, "Spotify Request", req.body);

  let { created_at, expires_in, access_token, refresh_token } =
    getCurrentToken();
  created_at.setSeconds(created_at.getSeconds() + expires_in);
  console.debug(
    `New Date's seconds ${new Date()}, vs fetched seconds ${created_at}`
  );

  const isExpired = new Date() > created_at;
  console.debug(`isExpired - ${isExpired}`);

  if (req.method === "PUT" && req.body.data.code) {
    // Get initial token
    if (isExpired) {
      res.status(401).json({
        status: 401,
        error: "Expired Token",
        message: "You're authorized token has expired",
      });
      res.redirect(
        process.env.NODE_ENV == "development" ? urls.DEVURL : urls.PRODURL
      );
      res.end()
    } else {
      logSuccess(sectors.apiSpotify, "Successful spotify token request");
      const list = topTenFetcher(req.body.data.code);
      res.status(200).json(list);
      res.end();
      // .then((res) => {
      //   res.status(200).json(list);
      //   res.end();
      // })
      // .catch((err) => {
      //   logError(
      //     sectors.apiSpotify,
      //     "Unsuccessful spotify token request - topTenFetcher",
      //     {
      //       service: "topTenFetcher",
      //       reason: err.response,
      //       data: err,
      //     }
      //   );
      //   res.status(400).end(err);
      //   res.end();
      // });
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
