import {
  Alert,
  Box,
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
import { nullSong, unformattedSong } from "../lib/constants";
import {
  handleAuth,
  requestToken,
  resetCache,
  search,
  topTenFetcher,
} from "../lib/spotify";
import { submitSotd, supabase } from "../lib/supabaseClient";

/**
 * @fileoverview Where all the customization happens
 * @function Admin
 * @remarks Worrying about overengineering. Hopefully it pays off
 */
const Admin = () => {
  const router = useRouter();
  const [songTitle, setSongTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSong, setSelectedSong] = useState(nullSong);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { data, error, isLoading, mutate } = useSWR<
    [unformattedSong],
    AxiosError
  >(["/spotify/10", authToken], () =>
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

  const {
    data: searchList,
    error: searchError,
    isLoading: searchIsLoading,
    mutate: searchMutate,
  } = useSWR<[unformattedSong], AxiosError>(
    ["/spotify/search", authToken],
    () =>
      search(authToken, songTitle)
        .then((res: any) => {
          if (errorMessage == "Only valid bearer authentication supported") {
            setErrorMessage("");
            setOpen(false);
          } else if (res && res.length > 0) {
            setSuccessMessage(`Searched spotify for ${songTitle}`);
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

  const updateSong = (song: any) => {
    setSelectedSong(song);
    setSongTitle(song?.name);
  };

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
        {!error && !isLoading && !songTitle ? (
          <MusicHero songList={data} selectSotd={updateSong} />
        ) : undefined}
        {!searchError && !searchIsLoading && songTitle ? (
          <MusicHero songList={searchList} selectSotd={updateSong} />
        ) : undefined}
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
              elevation={4}
              sx={{
                maxWidth: { xs: "70vw", md: "50vw", lg: "40vw" },
                mx: "auto",
              }}
            >
              <CardContent>
                <Box>
                  <FormControl
                    sx={{
                      py: 3,
                      width: "100%",
                    }}
                  >
                    <Stack
                      spacing={5}
                      sx={{
                        py: 3,
                        mx: "auto",
                        justifyContent: "space-around",
                        width: "75%",
                      }}
                    >
                      <Typography variant="h3" textAlign="center">
                        Song of the Day
                      </Typography>
                      <TextField
                        id="filled-song-input"
                        variant="filled"
                        label="Song"
                        type="text"
                        placeholder={selectedSong?.name}
                        value={songTitle}
                        error={!songTitle}
                        onChange={(e) => {
                          setSongTitle(e.target.value);
                        }}
                        onPointerLeave={() => {
                          searchMutate(searchList);
                        }}
                        onEmptied={() => {
                          setSongTitle("");
                          mutate(data);
                        }}
                        required
                      >
                        {selectedSong?.name ? selectedSong.name : undefined}
                      </TextField>
                      <TextField
                        value={description}
                        id="outlined-multiline-flexible"
                        label="What's the tea?"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        error={!description}
                        required
                        multiline
                        maxRows={4}
                      />
                      <Button
                        variant="text"
                        aria-label="login"
                        onClick={() => submitSotd(selectedSong, description)}
                      >
                        Submit SOTD
                      </Button>
                    </Stack>
                  </FormControl>
                </Box>
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
