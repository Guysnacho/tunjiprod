import axios, { AxiosError } from "axios";
import { endOfYesterday, parse } from "date-fns";
import { NextApiResponse } from "next";
import { NextRouter } from "next/router";
import { stringify } from "querystring";
import { Dispatch, SetStateAction } from "react";
import { logError, logSuccess } from "./common";
import { sectors, unformattedSong, urls } from "./constants";
import { supabase } from "./supabaseClient";

const formatTracks = (tracks: unformattedSong[]) => {
  return tracks.map((song: any) => {
    return {
      spotify_id: song.id,
      name: song.name,
      album: song.album.name,
      album_art: song.album.images[1], // Pick the second image in the list. Always 300px
      artists: song.artists.map((item: { name: any }) => {
        return item.name;
      }),
      preview_url: song.preview_url,
    };
  });
};

const topTenFetcher = (token: string) => {
  // const { data, error, isLoading } = useSWR(`/spotiy/top10/`, (token) => {
  return axios
    .get("https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      const formattedData = formatTracks(res.data.items);

      logSuccess(sectors.feSpotify, "Fetched top 10", formattedData);
      return formattedData;
    })
    .catch((err: AxiosError) => {
      //@ts-ignore
      throw err.response.data.error;
    });
};

const search = (token: string, track: string) => {
  // const { data, error, isLoading } = useSWR(`/spotiy/top10/`, (token) => {
  return axios
    .get(
      `https://api.spotify.com/v1/search?${stringify({
        q: track,
        limit: 5,
        type: ["track"],
        include_external: "audio"
      })}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((res) => {
      console.debug(res);
      const formattedData = formatTracks(res.data.tracks.items);
      console.debug(formattedData);

      logSuccess(
        sectors.feSpotify,
        `Searched spotify for ${track}`,
        formattedData
      );
      return formattedData;
    })
    .catch((err: AxiosError) => {
      //@ts-ignore
      throw err.response.data.error;
    });
};

const resetCache = () => {
  localStorage.removeItem("reroutes");
  localStorage.removeItem("token");
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
          process.env.NODE_ENV == "development" ? urls.DEVURL : urls.PRODURL,
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
 * @todo Make API Refresh and Fetch token. Must always be fresh as long as auth code is present
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
          created_at: endOfYesterday(),
          expires_in: 0,
          access_token: "",
          refresh_token: "",
        };
      }
    });

  logError(sectors.apiSpotify, "No results from supabase");
  return {
    created_at: endOfYesterday(),
    expires_in: 0,
    access_token: "",
    refresh_token: "",
  };
};

export {
  fetchAccessToken,
  getCurrentToken,
  handleAuth,
  refreshToken,
  requestToken,
  resetCache,
  search,
  topTenFetcher,
};
