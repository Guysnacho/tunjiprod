import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LoginIcon from "@mui/icons-material/Login";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import IconLink from "./individual/IconLink";

const Footer = () => {
  const theme = useTheme();
  const contrastColor = theme.palette.getContrastText(
    theme.palette.primary.dark
  );
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid
      container
      component="footer"
      justifyContent="center"
      mt={{ xs: 5, sm: 7, md: 10 }}
      py={4}
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: contrastColor,
        boxShadow:
          "rgba(50, 50, 93, 0.1) 0px 3px 30px -12px inset, rgba(0, 0, 0, 0.3) 0px 9px 18px -9px inset",
      }}
    >
      <Grid item xs={5} my={matches ? 1 : "auto"}>
        <Typography variant="body1" textAlign="center">
          Let's Chat!
        </Typography>
        <Typography
          my={2}
          display="flex"
          justifyContent="space-evenly"
          textAlign={matches ? "center" : undefined}
        >
          Made with ❤ by Tunji Productions
        </Typography>
        <Stack
          justifyContent="space-between"
          direction="row"
          spacing={0}
          mt={2}
        >
          <IconLink
            href="https://www.youtube.com/@tunjiproductions"
            child={<YouTubeIcon />}
            color={contrastColor}
          />
          <IconLink
            href="https://www.instagram.com/itsadetunji/"
            child={<InstagramIcon />}
            color={contrastColor}
          />
          <IconLink
            href="https://www.linkedin.com/in/sadetunji/"
            child={<LinkedInIcon />}
            color={contrastColor}
          />
          <IconLink
            href={`tel:${process.env.PHONENUMBER}`}
            child={<PhoneRoundedIcon />}
            color={contrastColor}
          />
          <IconLink
            href="/signin"
            child={<LoginIcon />}
            color={contrastColor}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Footer;
