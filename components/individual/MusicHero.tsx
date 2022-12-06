import { Alert, AlertTitle, Container, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react";
import { Database } from "../../lib/database.types";
import { handleSupabaseError } from "../../lib/helpers";
import { supabase } from "../../lib/supabaseClient";
import Single from "./Single";

export type Song = {
  id: number;
  created_at: string;
  title: string;
  artist: string;
  two_cents: string;
  album: string;
  written_by: string;
  produced_by: string;
};

const getData = () => {
  console.log("Get supabase data");
  let incoming = [];
  supabase
    .from<'sotd',Database>("profiles")
    .select("id, created_at, title, artist, two_cents, album, written_by, produced_by")
    .order("created_at")
    .then((res) => {
      if (res.body) {
        res.body.forEach((profile) =>
          incoming.push(
            createData(
              profile.fname + " " + profile.lname,
              profile.email,
              profile.interests
            )
          )
        );
        console.log(incoming);
        setClients(incoming);
      }
    });
};


const MusicHero = () => {
  // Fetch music data
  useEffect(() => {
    supabase
      .from("sotd")
      .select("*")
      .limit(5)
      .then()
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          setSongs(res.data);
        }
      });
  }, []);

  const [songs, setSongs] = useState([
    {
      id: 0,
      created_at: "",
      title: "",
      artist: "",
      two_cents: "",
      album: "",
      written_by: "",
      produced_by: "",
    },
  ]);
  const [error, setError] = useState({});

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
          {`${error.message}\nYeesh, sound issues. One sec..`}
        </Alert>
      ) : undefined}
      <Grid
        container
        sx={{
          display: "flex",
          flexFlow: "wrap",
        }}
      >
        {songs
          ? songs.map((song: any) => (
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
