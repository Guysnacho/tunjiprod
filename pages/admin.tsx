import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
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
import { authCodes } from "../lib/constants";

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

  return (
    <Grid container>
      <Grid item xs={12} sx={{ my: 3 }}>
        <Typography variant="h4" textAlign="center">
          Welcome Back 😌
        </Typography>
      </Grid>
      <Grid item xs={12} md={4} sx={{ my: 3, px: "auto" }}>
        <Card sx={{ mx: "auto" }}>
          <CardContent>
            <Stack>
              <FormControl sx={{ py: 5, mx: "auto", width: "75%" }}>
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
                  type="submit"
                  onSubmit={() => console.log("Song Submitted")}
                >
                  Submit SOTD
                </Button>
              </FormControl>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
export default Admin;
