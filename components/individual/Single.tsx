import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  useTheme
} from "@mui/material";
import { format } from "date-fns";

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

  const created_at = format(new Date(props.created_at), "PPP");

  return (
    <Card
      variant="outlined"
      sx={{
        m: "auto",
        borderWidth: "1.4px",
        "&:hover": {
          borderColor: "#f7d882",
          boxShadow: 20, // Display fab that expands modal
        },
        borderColor: "#ff8708",
        width: { xs: "12rem", sm: "22rem", md: "24rem", lg: "26rem" },
        height: { xs: "12rem", sm: "22rem", md: "24rem", lg: "26rem" },
        boxShadow: 5,
        background: `linear-gradient(205deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
        color: theme.palette.getContrastText(theme.palette.error.dark),
      }}
    >
      <CardHeader title={created_at} sx={{ textAlign: "center" }} />
      <CardMedia>
        <Typography variant="h6" textAlign="center">
          Album Cover Placeholder
        </Typography>
      </CardMedia>
      <CardContent>
        <Typography variant="h6" textAlign="center">
          {props.produced_by}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default Single;
