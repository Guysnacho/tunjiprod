import {
  Alert,
  AlertTitle,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";

import Head from "next/head";
import { Octokit } from "octokit";
//import { useEffect } from "react";
import Single from "../components/individual/Single";

const octokit = new Octokit();

const Home: NextPage = () => {
  const { isLoading, error, data } = useQuery(
    ["repoData"],
    () =>
      octokit.request(
        "GET /users/Guysnacho/repos?sort=created_at&direction=desc&per_page=5"
      ),
    {}
  );

  // useEffect(() => {
  //   console.log(data);
  // }, [isLoading]);

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
          my: 2,
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
      <Container sx={{ py: 3 }}>
        <Typography variant="h3" textAlign="center" sx={{ userSelect: "none" }}>
          Projects
        </Typography>
      </Container>
      {error ? ( // Failed to fetch repos
        <Alert color="error" sx={{ mx: "auto" }} variant="filled">
          <AlertTitle>Uh oh, Spaghetti-O's™</AlertTitle>
          {`${error}\nMan that's unlucky, try a refresh or sumn :)`}
        </Alert>
      ) : undefined}
      <Grid
        container
        sx={{
          display: "flex",
          flexFlow: "wrap",
        }}
      >
        {data?.data.map((repo: any, index: number) => (
          <Grid
            item
            xs={12}
            sm={6}
            px="auto"
            py={3}
            m="auto"
            key={index}
          >
            <Single
              index={index + 1}
              title={repo.name}
              body={repo.description}
              gitUrl={repo.html_url}
              createdAt={repo.created_at}
              previewUrl={repo.homepage}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
