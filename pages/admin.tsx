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
import { useEffect, useState } from "react";
import useSWR from "swr";
import { handleAuth, requestToken } from "../lib/spotify";
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
  const [authToken, setAuthToken] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    "Something went wrong during the spotify login :/"
  );

  // Redirect if not authed
  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      if (res.data.user) {
      } else router.replace("/");
    });
  }, []);

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
      localStorage.setItem("reroutes", "1");
      return;
    } else {
      if (reroutes < 1) {
        // If this is the first go around
        localStorage.setItem("reroutes", (reroutes + 1).toString());
        console.log(`Incremented reroutes - ${reroutes}`);
        handleAuth(router);
      } else {
        console.log("Max reroutes hit or refresh token found");
      }
    }
  }, [router.isReady]);

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
