import { Container, Paper, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import MusicHero from "../components/individual/MusicHero";
import ProjectHero from "../components/individual/ProjectHero";

/**
 * @function Home
 * @fileoverview Need I say more?
 * TODO - Add music section
 * TODO - Realtime interaction on SOTD
 * TODO - PWA Oppourtunity: Add push notifications for sotd. Minimal and respectful, only for repeat visitors
 */
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | Tunji Productions</title>
        <meta
          name="description"
          content="Feel free to peruse, home of everything Sam"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        component={Paper}
        sx={{
          width: { xs: "80vw", sm: "70vw", md: "65vw", lg: "61vw" },
          py: 3,
          my: 5,
        }}
      >
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ userSelect: "none", mb: 2 }}
        >
          Inspo
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          sx={{ userSelect: "none" }}
        >
          I kinda wanted to make a portfolio site. It'd be kinda boring if I
          only put coding projects though so I'm prolly gonna add my personal
          projects too. I put a lil smidgin of my soul in all my work but now
          that I've kind of hit a developer groove, I might as well put it in
          one place.
        </Typography>
      </Container>

      <ProjectHero />
      <MusicHero />
    </>
  );
};

export default Home;
