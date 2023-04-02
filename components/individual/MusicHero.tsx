//@ts-nocheck
import { Alert, AlertTitle, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Single from "./Single";

/**
 * @fileoverview This where the magic happens.
 * @function MusicHero
 * @todo Beefy component. I'll drop a music player either here or in the layout.
 */
const MusicHero = () => {
  const [songs, setSongs] = useState([{}]);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch music data
  useEffect(() => {
    supabase
      .from("sotd")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5)
      .then((res) => {
        res.data?.length > 0
          ? setSongs(res.data)
          : setErrorMessage("No songs returned");
      });

    console.debug(songs);
  }, []);

  return (
    <>
      <Container sx={{ py: 3 }}>
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ userSelect: "none", my: 10 }}
        >
          Song of the Day
        </Typography>
      </Container>

      <Grid
        container
        direction="row"
        wrap="nowrap"
        sx={{ overflowY: "hidden", overflowX: "auto" }}
        spacing={5}
      >
        {!errorMessage ? (
          songs.map((song) => (
            <Grid item xs={12} px="auto" key={song.id}>
              <Typography variant="h6" textAlign="center">
                {song.created_at?.split("T")[0]}
              </Typography>
              <Single
                id={song.id}
                created_at={song.created_at}
                title={song.title}
                artist={song.artist}
                two_cents={song.two_cents}
                album={song.album}
                written_by={song.written_by}
                produced_by={song.produced_by}
                album_art={song.album_art}
              />
            </Grid>
          ))
        ) : (
          // Failed to fetch repos
          <Alert
            color="error"
            severity="warning"
            sx={{ mx: "auto", width: "40vw" }}
            variant="filled"
          >
            {errorMessage}
          </Alert>
        )}
      </Grid>
    </>
  );
};

export default MusicHero;
