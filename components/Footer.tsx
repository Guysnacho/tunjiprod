import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LoginIcon from "@mui/icons-material/Login";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Grid, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import Auth from "./individual/Auth";
import IconLink from "./individual/IconLink";

/**
 * @fileoverview Social plugs and goodbyes w peace and love
 * @function Footer
 * @remarks Slightly improved on the footer from https://bosedeadetunji.com
 */
const Footer = () => {
  const theme = useTheme();
  const contrastColor = theme.palette.getContrastText(
    theme.palette.primary.light
  );

  const [opened, setOpened] = useState(false);

  return (
    <Grid
      container
      component="footer"
      justifyContent="center"
      mt={{ xs: 5, sm: 7, md: 10 }}
      py={4}
      sx={{
        backgroundColor: theme.palette.primary.dark,
        color: contrastColor,
        boxShadow:
          "rgba(50, 50, 93, 0.1) 0px 3px 30px -12px inset, rgba(0, 0, 0, 0.3) 0px 9px 18px -9px inset",
      }}
    >
      <Grid item xs={5} my={{ md: "auto", xs: 1 }}>
        <Typography variant="body1" textAlign="center">
          Let's Chat!
        </Typography>
        <Typography
          my={2}
          display="flex"
          justifyContent="space-evenly"
          textAlign={{ xs: "center", md: undefined }}
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
            href={`tel:${process.env.NEXT_PUBLIC_PHONENUMBER}`}
            child={<PhoneRoundedIcon />}
            color={contrastColor}
          />
          <IconButton onClick={() => setOpened(!opened)}>
            <LoginIcon />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        {opened ? <Auth opened={opened} setOpened={setOpened} /> : <></>}
      </Grid>
    </Grid>
  );
};

export default Footer;
