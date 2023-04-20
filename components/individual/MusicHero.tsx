//@ts-nocheck
import { Alert, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Single from "./Single";

/**
 * @fileoverview This where the magic happens.
 * @function MusicHero
 * @todo Beefy component. I'll drop a music player either here or in the layout.
 */
const MusicHero = (props: { songList?: [{}] }) => {
  const [songs, setSongs] = useState([{}]);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch music data
  useEffect(() => {
    console.debug(props.songList);
    if (!props.songList) {
      supabase
        .from("sotd_test")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5)
        .then((res) => {
          res.data?.length > 0
            ? setSongs(res.data)
            : setErrorMessage("No songs returned");
        });
    } else if (props.songList.length == 0) {
      setErrorMessage("No songs given");
    }
    console.debug(props.songList);
  }, []);

  return (
    <Grid
      container
      direction="row"
      wrap="nowrap"
      sx={{ overflowY: "hidden", overflowX: "auto" }}
      spacing={5}
    >
      {!errorMessage ? (
        props.songList?.length > 0 ? ( // If passed songlist from search
          props.songList.map((song) => (
            <Grid item xs={12} px="auto" key={song.id}>
              <Single
                id={song.id}
                name={song.name}
                album={song.album}
                album_art={song.album_art}
                artists={song.artists}
                previewUrl={song.previewUrl}
              />
            </Grid>
          ))
        ) : (
          songs.map((song) => (
            <Grid item xs={12} px="auto" key={song.id}>
              <Typography variant="h6" textAlign="center">
                {song.created_at?.split("T")[0]}
              </Typography>
              <Single
                id={song.id}
                title={song.title}
                album={song.album}
                album_art={song.album_art}
                artists={song.artists}
                created_at={song.created_at}
                two_cents={song.two_cents}
                written_by={song.written_by}
                produced_by={song.produced_by}
              />
            </Grid>
          ))
        )
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
  );
};

export default MusicHero;
