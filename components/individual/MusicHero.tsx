//@ts-nocheck
import {
  Alert,
  Button,
  CardContent,
  Grid,
  TextField,
  Typography,
  Card,
  Modal,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Single, { Song } from "./Single";

/**
 * @fileoverview This where the magic happens.
 * @function MusicHero
 * @todo Beefy component. I'll drop a music player either here or in the layout.
 */
const MusicHero = (props: {
  songList?: [{}];
  selectSotd?: any;
  isAuthed?: boolean;
}) => {
  const [songs, setSongs] = useState([{}]);
  const [selectedSong, setSelectedSong] = useState({});
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  // Fetch music data
  useEffect(() => {
    console.debug(props.songList);
    if (!props.songList) {
      supabase
        .from("sotd")
        .select("*")
        .order("created_at", { ascending: false })
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

  const handleUpdate = async (song) => {
    setEditing(true);
    supabase
      .from("sotd")
      .update({
        description,
      })
      .eq("id", song.id as number)
      .select()
      .single()
      .then((res) => {
        console.log("Submitted update for song");
        console.log(description);
        console.log(song.id);
        if (res.error) {
          console.error("Error occured");
          console.error(res.error);
          setErrorMessage(res.error.message);
        } else {
          console.debug("Successful save");
          console.debug(res.status);
          console.debug(song);
          console.debug(res.data);
          window.location.reload()
        }
      });
    setEditing(false);
  };

  return (
    <Grid
      container
      direction="row"
      wrap="nowrap"
      sx={{
        overflowY: "hidden",
        overflowX: "auto",
        my: 3,
        width: "80%",
        mx: "auto",
      }}
      spacing={5}
    >
      {!errorMessage ? (
        props.songList?.length > 0 ? ( // If passed songlist from search
          props.songList.map((song, index) => (
            <Grid item xs={12} px="auto" key={index}>
              <Single
                id={song.spotify_id}
                key={song.spotify_id}
                name={song.name}
                album={song.album}
                album_art={song.album_art}
                artists={song.artists}
                previewUrl={song.previewUrl}
              />
              <Button
                color="secondary"
                fullWidth
                variant="contained"
                onClick={() => props.selectSotd(song)}
                sx={{ mb: 2 }}
              >
                Select SOTD
              </Button>
            </Grid>
          ))
        ) : (
          songs.map((song,index) => (
            <Grid
              item
              xs={12}
              px="auto"
              key={index}
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <Typography variant="h6" textAlign="center">
                {song.created_at?.split("T")[0]}
              </Typography>
              <Single
                id={song.spotify_id}
                key={song.id}
                name={song.name}
                album={song.album}
                album_art={song.album_art}
                artists={song.artists}
                previewUrl={song.previewUrl}
                description={song.description}
              />
              {props.isAuthed ? (
                <Button
                  variant="contained"
                  sx={{ width: "50%", mx: "auto", mb: 3 }}
                  onClick={() => {
                    setSelectedSong(song);
                    setSuccessMessage("");
                    setErrorMessage("");
                    setEditing(true);
                  }}
                >
                  Edit
                </Button>
              ) : undefined}
            </Grid>
          ))
        )
      ) : (
        // Failed to fetch repos
        <>
          <Alert
            color="error"
            severity="warning"
            sx={{ mx: "auto", width: "40vw" }}
            variant="filled"
          >
            {errorMessage}
          </Alert>
          <Alert
            color="success"
            severity="success"
            sx={{ mx: "auto", width: "40vw" }}
            variant="filled"
          >
            {successMessage}
          </Alert>
        </>
      )}
      {editing ? (
        <Modal
          open={editing}
          onClose={() => {
            setSelectedSong({});
            setDescription("");
            setEditing(false);
          }}
        >
          <Card py="auto">
            <CardContent sx={{ my: "auto" }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <TextField
                  value={description}
                  id="outlined-multiline-flexible"
                  label="New description"
                  placeholder={selectedSong.description}
                  sx={{ width: "75%", alignSelf: "center" }}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  error={!description}
                  required
                  multiline
                  maxRows={4}
                  minRows={4}
                />
                <Button
                  variant="text"
                  aria-label="login"
                  sx={{ width: "40%" }}
                  onClick={() => handleUpdate(selectedSong)}
                >
                  Submit Edit
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Modal>
      ) : undefined}
    </Grid>
  );
};

export default MusicHero;
