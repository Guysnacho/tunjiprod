import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Paper,
  Slide,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { imgUrls } from "../../lib/constants";

/**
 * @type Song
 * @remark Minimizing the amount of confusion and foot shooting
 */
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

/**
 * @fileoverview A single, music container. Bouta be the juiciest piece tbh
 * @function Single
 * @todo I want a swoosh from the right side when this section scrolls into view. A list of tiles, tapping interaction (plays song, brings modal with remarks, shows album art, etc)
 * @todo Make desktop box smaller
 */
const Single = (props: Song) => {
  const theme = useTheme();
  const [tapped, setTapped] = useState(false);
  const cardRef = useRef(null);

  const cardDimensions = ["10rem", "14rem", "15rem", "16rem", "17rem"];

  return (
    <Box display="flex" mx={3} my={6}>
      <Card
        elevation={5}
        sx={{
          borderWidth: "1.4px",
          "&:hover": {
            borderColor: "#f7d882",
            boxShadow: 20, // Display fab that expands modal
          },
          borderColor: "#ff8708",
          m: "auto",
          display: "flex",
          flexDirection: "row",
          minWidth: cardDimensions,
          minHeight: cardDimensions,
          boxShadow: 5,
          background: `linear-gradient(205deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
          color: theme.palette.getContrastText(theme.palette.error.dark),
        }}
      >
        <CardActionArea
          onClick={() => setTapped(!tapped)}
          sx={{ position: "relative", zIndex: 1 }}
        >
          <CardMedia
            component="img"
            alt="Album Cover"
            image={imgUrls.SONGPLACEHOLDER}
          />
        </CardActionArea>
      </Card>
      <Box ref={cardRef}>
        <Slide
          direction="right"
          in={tapped}
          appear={false}
          mountOnEnter
          unmountOnExit
          timeout={400}
          container={cardRef.current}
        >
          <Grid
            container
            component={Paper}
            variant="elevation"
            elevation={3}
            direction="column"
            width={cardDimensions}
            maxHeight={["9rem", "12rem", "14rem", "15rem", "16rem"]}
            overflow="auto"
            ml={-0.5}
            mt={0.25}
          >
            <Stack spacing={2} mt={2}>
              <Typography variant="overline" textAlign="center" mx="auto">
                {props.title} - {props.artist}
              </Typography>
              <Typography variant="overline" textAlign="center" mx="auto">
                {props.album}
              </Typography>
              <Typography variant="body2" textAlign="center">
                {props.two_cents}
              </Typography>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="song-credit-content"
                  id="song-credit-header"
                >
                  <Typography variant="body2" textAlign="center">
                    Credits
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="overline" textAlign="center">
                    {props.written_by}
                  </Typography>
                  <Typography variant="overline" textAlign="center">
                    <br />
                    {props.produced_by}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Stack>
          </Grid>
        </Slide>
      </Box>
    </Box>
  );
};
export default Single;
