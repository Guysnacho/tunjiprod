import axios, { AxiosError } from "axios";
import { parse } from "date-fns";
import { NextApiResponse } from "next";
import { NextRouter } from "next/router";
import { stringify } from "querystring";
import { Dispatch, SetStateAction } from "react";
import { logError, logSuccess } from "./common";
import { sectors, top10, urls } from "./constants";
import { supabase } from "./supabaseClient";

const topTenFetcher = async (token: string) => {
  // const { data, error, isLoading } = useSWR(`/spotiy/top10/`, (token) => {
  return axios
    .get("https://api.spotify.com/v1/me/top/tracks?limit=10", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      const data = res.data;
      console.debug("Data fetched from spotty");
      return data.items.map((song: any) => {
        console.debug("Song Name - " + song.name);
        console.debug("Images" + song.album.images.length);
        console.debug(
          song.artists.map((item: { name: any }) => {
            return item.name;
          })
        );
        console.debug(song.preview_url);

        return {
          name: song.name,
          images: song.album.images,
          artists: song.artists.map((item: { name: any }) => {
            return item.name;
          }),
          previewUrl: song.preview_url,
        };
      });
    })
    .catch((err) => {
      return err.response;
    });
  // });
};

const fetchTop10 = () => {
  const token = localStorage.getItem("token") || "";

  axios
    .get(`https://api.spotify.com/v1/me/top/tracks?limit=10`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.debug(res.data);
      console.debug("Data fetched from spotty");
      console.debug(res.data);
      const formattedData: [top10] = res.data?.items.map((song: any) => {
        return {
          name: song.name,
          images: song.album.images,
          artists: song.artists.map((item: { name: any }) => {
            return item.name;
          }),
          previewUrl: song.preview_url,
        };
      });
      return formattedData;
    })
    .catch((err) => {
      return err.response;
    });

  // Navigate sporify response
};

const resetCache = (router?: NextRouter) => {
  localStorage.removeItem("reroutes");
  localStorage.removeItem("token");
  router?.reload();
};

/**
 * @function handleAuth
 * @remarks Pushes to spotify auth and redirects with query params
 */
const handleAuth = (router: NextRouter) => {
  // Authorize and allow scopes
  router.push(
    "https://accounts.spotify.com/authorize?" +
      stringify({
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        response_type: "code",
        redirect_uri:
          process.env.NODE_ENV == "development"
            ? urls.DEVURL_ADMIN
            : urls.PRODURL_ADMIN,
        state: process.env.NODE_ENV,
        scope:
          "user-read-private user-library-read user-read-email user-top-read",
        show_dialog: false,
      }),
    "https://spotify.com/ooglyboogly"
  );
};

/**
 * @function requestToken
 * @remarks Fetches an auth token using auth code from `handleAuth`
 */
const requestToken = (
  token: string | string[],
  setErrorMessage: Dispatch<SetStateAction<string>>,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  axios
    .post("/api/auth", {
      code: token,
    })
    .then((response) => {
      const data = JSON.parse(response.data);
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        logSuccess(
          sectors.feSpotify,
          "Successfully fetched and stored token",
          data
        );
      } else {
        setErrorMessage(`Spotify didn't like that`);
        logError(
          sectors.extSpotify,
          "Error requesting token",
          response.data.error
        );
        setOpen(true);
        console.error(response.data.error);
      }
    })
    .catch((err) => {
      setErrorMessage(`Error fetching token`);
      logError(sectors.apiSpotify, "Error fetching token", err);
      setOpen(true);
      console.error({
        status: err.status,
        response: err.response,
        message: err.nessage,
      });
    });
};

/**
 * @function fetchAccessToken
 * @remarks Fetch auth token using `auth_code`
 * @link https://nextjs.org/docs/api-routes/introduction
 */
const fetchAccessToken = (auth_code: string, res: NextApiResponse) => {
  console.debug("Entering token fetch");

  axios
    .post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        code: auth_code,
        grant_type: "authorization_code",
        redirect_uri:
          process.env.NODE_ENV == "development"
            ? urls.DEVURL_ADMIN
            : urls.PRODURL_ADMIN,
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
      console.debug("Fetched token");
      console.debug(response.data);

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
          reason: err,
        }
      );
      res.status(400).end(JSON.stringify(err));
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
  console.debug("Entering token refresh");

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
      console.debug("Fetched refresh token");
      console.debug(response.data);

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
      console.debug("Error on refreshToken Post");
      console.error(err);
      logError(
        sectors.apiSpotify,
        "Unsuccessful spotify token request - refreshToken",
        {
          service: "refreshToken",
          reason: err,
        }
      );
      res.status(400).json(JSON.stringify(err));
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
      console.debug();
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

export {
  fetchAccessToken,
  fetchTop10,
  getCurrentToken,
  handleAuth,
  refreshToken,
  requestToken,
  resetCache,
  topTenFetcher,
};

// const refreshToken = (
//   refresh: string | string[],
//   setErrorMessage: Dispatch<SetStateAction<string>>,
//   setOpen: Dispatch<SetStateAction<boolean>>
// ) => {
//   axios
//     .post("/api/auth", {
//       refresh: refresh,
//     })
//     .then((res) => {
//       if (res.data.access_token) {
//         localStorage.setItem("token", res.data.access_token);
//         localStorage.setItem("refresh", res.data.refresh_token || "");
//         logSuccess(
//           sectors.feSpotify,
//           "Successfully fetched and stored token",
//           res.data
//         );
//         console.debug("Successfully fetched and stored token");
//         return res.data;
//       } else {
//         setErrorMessage(`Spotify didn't like that`);
//         logError(
//           sectors.extSpotify,
//           "Error requesting token refresh",
//           res.data.error
//         );
//         setOpen(true);
//         return res.data.error;
//       }
//     })
//     .catch((err) => {
//       setErrorMessage(`Error requesting refresh token`);
//       logError(sectors.apiSpotify, "Error requesting refresh token", err);
//       setOpen(true);
//       return {
//         status: err.status,
//         response: err.response,
//         message: err.nessage,
//       };
//     });
// };
