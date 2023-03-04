import {
  Alert,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { stringify } from "querystring";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { supabase } from "../lib/supabaseClient";
import { urls } from "../lib/constants";

/**
 * @fileoverview Where all the customization happens
 * @function Admin
 * @remarks Worrying about overengineering. Hopefully it pays off
 */
const Admin = () => {
  const router = useRouter();
  const [songTitle, setSongTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Something went wrong during the spotify login :/"
  );

  // Redirect if not authed
  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      res.data.user ? handleAuth() : router.replace("/");
    });
  }, []);

  const handleAuth = () => {
    const refresh = localStorage.getItem("refresh");
    const query = {
      code: router.query.code,
      error: router.query.error,
      state: router.query.state,
    };
    console.log(`${refresh} - ${query}`);
    if (refresh === null && query.code === null) {
      router.push(
        "https://accounts.spotify.com/authorize?" +
          stringify({
            client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
            response_type: "code",
            redirect_uri:
              process.env.NODE_ENV == "development"
                ? urls.DEVURL
                : urls.PRODURL,
            request_id: process.env.NODE_ENV,
            scope: "user-read-private user-library-read user-read-email",
            show_dialog: false,
          })
      );
    } else if (query.code !== null) {
      fetch("/api/auth", {
        method: "POST",
        body: stringify({
          code: query.code,
        }),
      }).then((res) => {
        if(res. !== "")
        localStorage.setItem("token", res.body.token | "");
      });
    } else {
      setErrorMessage(`Error during spotify auth - ${query.error}`);
      supabase
        .from("logs")
        .insert({ status: 2, sector: "UI - Spotify", message: errorMessage })
        .then(() => setOpen(true));
    }
  };

  const { data, error, isLoading } = useSWR("/search", () => fetch);

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
        <Grid item xs={12} sx={{ my: 3 }}>
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
                    onClick={() => console.log("Song Submitted")}
                  >
                    Submit SOTD
                  </Button>
                </FormControl>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Snackbar open={open} onClose={() => setOpen(false)}>
          <Alert
            onClose={() => setOpen(false)}
            severity="warning"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
};
export default Admin;
