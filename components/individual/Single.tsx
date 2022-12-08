import LaunchIcon from "@mui/icons-material/Launch";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useState } from "react";

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
 */
const Single = (props: Song) => {
  const theme = useTheme();
  const bgDark = "#0c1e2a";
  const bgLight = "#036da9"; //036da9
  const [hover, setHover] = useState(false);
  const isBig = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Card
      variant="outlined"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        m: "auto",
        borderWidth: "1.4px",
        borderColor: hover ? "#f7d882" : "#ff8708",
        width: { xs: "65%", sm: "70%", md: "75%", lg: "78%" },
        //height: { xs: "15vh%", sm: "17vh", md: "20vh", lg: "23vh" },
        boxShadow: hover ? 20 : 5,
        background: `linear-gradient(205deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.dark})`,
        color: theme.palette.getContrastText(theme.palette.secondary.dark),
      }}
    >
      <CardHeader title={props.title} sx={{ textAlign: "center" }} />
      <CardContent>
        <Box
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1" paragraph textAlign="center">
            {props.artist}
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexFlow: { xs: "column", md: "row" },
          justifyContent: { xs: "space-evenly", md: "space-between" },
          m: 0.5,
        }}
      >
        <Typography variant="overline">
          {isBig ? "Created at - " : "🐣 on - "}
          {props.created_at}
        </Typography>
        <Box sx={{ justifyContent: "right" }}>
          <>
            <IconButton
              sx={{ color: "#f7d882" }}
              about="Github repository link"
              href={`https://www.ecosia.org/search?q=${props.title.replace(
                " ",
                "%20"
              )}${props.artist.replace(" ", "%20")}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <LaunchIcon />
            </IconButton>
          </>
        </Box>
      </CardActions>
    </Card>
  );
};
export default Single;
