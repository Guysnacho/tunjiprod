import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Song } from "../components/individual/Single";

/**
 * @fileoverview Where all the customization happens
 * @function Admin
 * @remarks Worrying about overengineering. Hopefully it pays off
 */
const Admin = () => {
  const router = useRouter();

  const [songs, setSongs] = useState([]);
  const [songTitle, setSongTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [two_cents, setTwo_cents] = useState("");
  const [album, setAlbum] = useState("");
  const [album_art, setAlbum_art] = useState("");
  const [written_by, setWritten_by] = useState("");
  const [produced_by, setProduced_by] = useState("");

  let fasdf: Song;

  // Redirect if not authed
  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      res.data.user ? undefined : router.replace("/");
    });
  }, []);

  const handleSubmit = () =>
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${songTitle}&api_key=${process.env.NEXT_PUBLIC_LAST_FM_TOKEN}&format=json`
    )
      .then((res) => res.json())
      .then((data) => setSongs(data.results.trackmatches))
      .catch((err) => console.error(err));

  useEffect(() => {
    console.log(songs);
  }, [songs]);

  return (
    <Grid container>
      <Grid item xs={12} sx={{ my: 3 }}>
        <Typography variant="h4" textAlign="center">
          Welcome Back 😌
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ my: 3, px: "auto" }}>
        <Card
          sx={{
            width: { xs: "65vw", sm: "45vw", md: "30vw", lg: "25vw" },
            mx: "auto",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h5"
              textAlign="center"
              sx={{ userSelect: "none" }}
            >
              Search
            </Typography>
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
            <TextField
              id="filled-artist-input"
              variant="filled"
              label="Artist"
              type="text"
              value={artist}
              onChange={(e) => {
                setArtist(e.target.value);
              }}
              required
            />
            <TextField
              id="filled-description-input"
              variant="filled"
              multiline
              minRows={3}
              maxRows={5}
              label="Description"
              type="text"
              value={two_cents}
              onChange={(e) => {
                setTwo_cents(e.target.value);
              }}
              required
            />
            <TextField
              id="filled-album-input"
              variant="filled"
              label="Album"
              type="text"
              value={album}
              onChange={(e) => {
                setAlbum(e.target.value);
              }}
              required
            />
            <TextField
              id="filled-album-art-input"
              variant="filled"
              label="Album Art"
              type="text"
              value={album_art}
              onChange={(e) => {
                setAlbum_art(e.target.value);
              }}
              required
            />
            <TextField
              id="filled-song-input"
              variant="filled"
              label="Song"
              type="text"
              value={written_by}
              onChange={(e) => {
                setWritten_by(e.target.value);
              }}
              required
            />
            <TextField
              id="filled-song-input"
              variant="filled"
              label="Song"
              type="text"
              value={produced_by}
              onChange={(e) => {
                setProduced_by(e.target.value);
              }}
              required
            />
            <Button variant="text" aria-label="login" type="submit">
              Search
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} item>
        <Box component={Paper}>
          <List sx={{ width: "75%", maxWidth: 400 }}></List>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Admin;
