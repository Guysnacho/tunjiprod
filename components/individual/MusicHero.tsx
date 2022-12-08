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
  // Fetch music data

  useEffect(() => {
    console.log("useEffect Request");
    supabase
      .from("sotd")
      .select("*")
      .order("created_at")
      .limit(5)
      .then()
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          setSongs(res.data);
          console.log("New request");
        }
      });
  }, []);

  const [songs, setSongs] = useState([]);
  const [error, setError] = useState();

  return (
    <>
      <Container sx={{ py: 3 }}>
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ userSelect: "none", my: 10 }}
        >
          Music
        </Typography>
      </Container>
      {error ? ( // Failed to fetch repos
        <Alert color="error" sx={{ mx: "auto" }} variant="filled">
          <AlertTitle>MTV killed the radio star™</AlertTitle>
          {`${error}\nYeesh, sound issues. One sec..`}
        </Alert>
      ) : (
        <></>
      )}
      <Grid
        container
        sx={{
          display: "flex",
          flexFlow: "wrap",
        }}
      >
        {songs
          ? songs.map((song) => (
              <Grid item xs={12} sm={6} px="auto" py={4} m="auto" key={song.id}>
                <Single
                  id={song.id}
                  created_at={song.created_at}
                  title={song.title}
                  artist={song.artist}
                  two_cents={song.two_cents}
                  album={song.album}
                  written_by={song.written_by}
                  produced_by={song.produced_by}
                />
              </Grid>
            ))
          : undefined}
      </Grid>
    </>
  );
};

export default MusicHero;
