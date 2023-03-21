import axios from "axios";
import { NextRouter } from "next/router";
import { stringify } from "querystring";
import { Dispatch, SetStateAction } from "react";
import useSWR from "swr";
import { logError, logSuccess } from "./common";
import { sectors, urls } from "./constants";

const useSearch = (title: string, artist: string) => {
  const { data, error, isLoading } = useSWR(`/api/search/${title}`, () => {
    fetch(
      `https://api.spotify.com/v1/search?type=track&track=${title}&artist=${artist}`
    );
  });

  return {
    data: data,
    isLoading,
    isError: error,
  };
};

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
        scope: "user-read-private user-library-read user-read-email",
        show_dialog: false,
      })
  );
};

const refreshToken = (
  refresh: string | string[],
  setErrorMessage: Dispatch<SetStateAction<string>>,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  axios
    .post("/api/auth", {
      refresh: refresh,
    })
    .then((res) => {
      if (res.data.access_token) {
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("refresh", res.data.refresh_token || "");
        logSuccess(
          sectors.feSpotify,
          "Successfully fetched and stored token",
          res.data
        );
      } else {
        setErrorMessage(`Spotify didn't like that`);
        logError(
          sectors.extSpotify,
          "Error requesting token refresh",
          res.data.error
        );
        setOpen(true);
      }
    })
    .catch((err) => {
      setErrorMessage(`Error requesting refresh token`);
      logError(sectors.apiSpotify, "Error requesting refresh token", err);
      setOpen(true);
    });
};

const requestToken = (
  token: string | string[],
  setErrorMessage: Dispatch<SetStateAction<string>>,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  axios
    .post("/api/auth", {
      code: token,
    })
    .then((res) => {
      if (res.data.access_token) {
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("refresh", res.data.refresh_token || "");
        logSuccess(
          sectors.feSpotify,
          "Successfully fetched and stored token",
          res.data
        );
      } else {
        setErrorMessage(`Spotify didn't like that`);
        logError(sectors.extSpotify, "Error requesting token", res.data.error);
        setOpen(true);
      }
    })
    .catch((err) => {
      setErrorMessage(`Error fetching token`);
      logError(sectors.apiSpotify, "Error fetching token", err);
      setOpen(true);
    });
};

export { handleAuth, refreshToken, requestToken, useSearch };
