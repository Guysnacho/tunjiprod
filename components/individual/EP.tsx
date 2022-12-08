import GitHubIcon from "@mui/icons-material/GitHub";
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
  useTheme,
} from "@mui/material";
import { useState } from "react";

type SingleProps = {
  index: number;
  title: string;
  body: string;
  createdAt: string;
  gitUrl: string;
  previewUrl?: string;
};

/**
 * @fileoverview An EP, a collection of musical pieces. A splash of pizazzz
 * @function EP
 * @todo Add a specific highlight on a favorite block
 */
const EP = (props: SingleProps) => {
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
      <CardHeader
        title={`${props.title.replaceAll("-", " ")}`}
        sx={{ textAlign: "center" }}
      />
      <CardContent>
        <Box
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1" paragraph textAlign="center">
            {props.body}
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
          {isBig ? "Created at - " : "🐣 on - "} {props.createdAt.split("T")[0]}
        </Typography>
        <Box sx={{ justifyContent: "right" }}>
          <IconButton
            sx={{ color: "#f7d882" }}
            about="Github repository link"
            href={props.gitUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            <GitHubIcon />
          </IconButton>
          {props.previewUrl ? (
            <>
              <IconButton
                sx={{ color: "#f7d882" }}
                about="Github repository link"
                href={props.previewUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                <LaunchIcon />
              </IconButton>
            </>
          ) : (
            <></>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};
export default EP;
