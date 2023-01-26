import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { randomUUID } from "crypto";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

/**
 * @fileoverview Where all the customization happens
 * @function Admin
 * @remarks Worrying about overengineering. Hopefully it pays off
 */
const Admin = () => {
  const router = useRouter();

  const [songTitle, setSongTitle] = useState("");

  // Redirect if not authed
  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      res.data.user ? undefined : router.replace("/");
    });
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token === null) {
      handleAuth();
    } else {
      const refresh = token.split("**")[1];
      token = token.split("**")[0];
    }
  }, []);

  const handleAuth = () => {
    const state = randomUUID()
    const scope = 
  }

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
      </Grid>
    </>
  );
};
export default Admin;
