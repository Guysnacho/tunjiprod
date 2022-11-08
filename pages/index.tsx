import { Alert, AlertTitle, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";

import Head from "next/head";
import { Octokit } from "octokit";
import Single from "../components/individual/Single";

const octokit = new Octokit({ auth: process.env.GITHUBFINEGRAINEDTOKEN });

const Home: NextPage = () => {
  const { isLoading, error, data } = useQuery(
    ["repoData"],
    () =>
      octokit.request(
        "GET /users/Guysnacho/repos?sort=created_at&direction=desc&per_page=10"
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

      {error ? (
        <Alert color="info" sx={{ mx: "auto" }} variant="filled">
          <AlertTitle>Uh oh, Spaghetti-O's™</AlertTitle>
          {`${error}\nMan that's unlucky, try a refresh or sumn :)`}
        </Alert>
      ) : (
        <></>
      )}

      <Grid
        container
        sx={{
          display: "flex",
          flexFlow: "wrap",
        }}
      >
        {data?.data.map((repo: any, index: number) => (
          <Grid item xs={12} sm={6} md={4} px="auto" py={3} mx="auto">
            <Single
              key={index}
              index={index + 1}
              title={repo.name}
              body={repo.description}
              createdAt={repo.created_at}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
