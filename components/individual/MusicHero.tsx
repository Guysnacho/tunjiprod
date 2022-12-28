//@ts-nocheck
import { Alert, AlertTitle, Container, Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import useSWR from "swr";
import Single from "./Single";

/**
 * @fileoverview This where the magic happens.
 * @function MusicHero
 * @todo Beefy component. I'll drop a music player either here or in the layout.
 */
const MusicHero = () => {
  // Fetch music data

  const { songs, error, isLoading } = useSWR("/sotd", () =>
    supabase
      .from("sotd")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5)
  );
  const created_at = (timestamp: string) => format(new Date(timestamp), "M/d");

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
          {`${error.message} -  Yeesh, sound issues. One sec..`}
        </Alert>
      ) : (
        <></>
      )}
      <Grid
        container
        direction="row"
        wrap="nowrap"
        sx={{ overflowY: "hidden", overflowX: "auto" }}
        spacing={5}
      >
        {songs ? (
          songs.map((song) => (
            <Grid item xs={12} px="auto" key={song.id}>
              <Typography variant="h6" textAlign="center">
                {created_at(song.created_at)}
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
          <Alert severity="warning" variant="filled" sx={{ mx: "auto" }}>
            Weird, we didn't get any songs back after asking.
            <br />
            Try again later?
          </Alert>
        )}
      </Grid>
    </>
  );
};

export default MusicHero;
