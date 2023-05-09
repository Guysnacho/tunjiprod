import {
  Alert,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  Skeleton,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import useSWR from "swr";
import MusicHero from "../components/individual/MusicHero";
import { top10 } from "../lib/constants";
import {
  handleAuth,
  requestToken,
  resetCache,
  topTenFetcher,
} from "../lib/spotify";
import { supabase } from "../lib/supabaseClient";

/**
 * @fileoverview Where all the customization happens
 * @function Admin
 * @remarks Worrying about overengineering. Hopefully it pays off
 */
const Admin = () => {
  const router = useRouter();
  const [songTitle, setSongTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { data, error, isLoading, mutate } = useSWR<[top10], AxiosError>(
    ["/spotify/10", authToken],
    () =>
      topTenFetcher(authToken)
        .then((res: any) => {
          if (errorMessage == "Only valid bearer authentication supported") {
            setErrorMessage("");
            setOpen(false);
          } else if (res && res.length > 0) {
            setSuccessMessage("Fetched top songs");
          }
          return res;
        })
        .catch((err) => {
          if (localStorage.getItem("reroutes")) {
            setErrorMessage(err.message);
            setOpen(true);
          }
          return err;
        })
  );

  // Redirect if not authed
  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      if (res.data.user) {
      } else router.replace("/");
    });
  }, []);

  // Refetch on authtoken change
  useEffect(() => {
    mutate();
  }, [authToken]);

  // Handle token related fetch errors
  useEffect(() => {
    if (router.isReady) {
      const reroutes = localStorage.getItem("reroutes");
      if (
        reroutes == "1" &&
        error &&
        (error.status == 401 || error.status == 400)
      ) {
        if (error.status == 401) {
          setErrorMessage(error.message);
          setOpen(true);
          resetCache();
        } else if (error.status == 400 && !router.query.code) {
          setErrorMessage(error.message);
          setOpen(true);
          // resetCache();
          // router.reload()
        }
      } else if (reroutes == "1" && !isLoading && data) {
        router.push("/admin", "/admin", { shallow: true });
      }
    }
  }, [data, isLoading, router.isReady]);

  // Kick off spotify auth
  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token || "");
    const reroutes = Number.parseInt(localStorage.getItem("reroutes") || "0");
    const query = {
      auth_code: router.query.code?.toString(),
      error: router.query.error?.toString(),
      state: router.query.state?.toString(),
    };

    if (query.auth_code) {
      // After initial get
      requestToken(query.auth_code, setErrorMessage, setOpen);
    } else if (authToken) {
      if (error && error.message == "The access token expired") {
        resetCache();
        router.reload();
      } else {
        localStorage.setItem("reroutes", "1");
      }
      setLoading(false);
      return;
    } else {
      if (reroutes < 1) {
        // If this is the first go around
        localStorage.setItem("reroutes", (reroutes + 1).toString());
        setAuthToken(token || "");
        handleAuth(router);
      } else {
        console.debug("Max reroutes hit or refresh token found");
        setAuthToken(token || "");
        setLoading(false);
      }
    }
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>Studio | Tunji Productions</title>
        <meta name="description" content="Where the magic happens" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container>
        <Grid item xs={12} sx={{ my: 3 }}>
          <Typography variant="h4" textAlign="center">
            Welcome Back 😌
          </Typography>
        </Grid>
        {!error ? <MusicHero songList={data} /> : undefined}
        <Grid item xs={12} sx={{ my: 3 }}>
          {loading ? (
            <Skeleton
              sx={{
                width: { xs: "70vw", md: "50vw", lg: "40vw" },
                height: { xs: "70vh", md: "50vh", lg: "40vh" },
                mx: "auto",
              }}
            />
          ) : (
            <Card
              sx={{
                maxWidth: { xs: "70vw", md: "50vw", lg: "40vw" },
                mx: "auto",
              }}
            >
              <CardContent>
                <Stack>
                  <FormControl
                    sx={{
                      py: 3,
                      mx: "auto",
                    }}
                  >
                    <TextField
                      id="filled-song-input"
                      variant="filled"
                      label="Song"
                      type="text"
                      value={songTitle}
                      onChange={(e) => {
                        setSongTitle(e.target.value);
                      }}
                      required
                    />
                    <Button
                      variant="text"
                      aria-label="login"
                      onClick={() => console.debug("Song Submitted")}
                    >
                      Submit SOTD
                    </Button>
                  </FormControl>
                </Stack>
              </CardContent>
            </Card>
          )}
        </Grid>
        <Snackbar open={open} onClose={() => setOpen(false)}>
          <Alert
            onClose={() => {
              setOpen(false);
              setErrorMessage("");
              setSuccessMessage("");
            }}
            severity={successMessage ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {successMessage ? successMessage : errorMessage}
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
};
export default Admin;
