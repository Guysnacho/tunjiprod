import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";

import Head from "next/head";
import { Octokit } from "octokit";
import { useEffect } from "react";
import Single from "../components/individual/Single";

const octokit = new Octokit({ auth: process.env.GITHUBFINEGRAINEDTOKEN });

const Home: NextPage = () => {
  const { isLoading, error, data } = useQuery(["repoData"], () =>
    octokit.request("GET /users/Guysnacho/repos")
  );

  useEffect(() => {
    console.log(data);
  }, [isLoading]);

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

      <Grid item xs={12}>
        {data?.data.map((repo: any, index: number) => (
          <Single
            key={repo.id}
            index={index + 1}
            title={repo.name}
            body={repo.description}
            createdAt={repo.created_at}
          />
        ))}
      </Grid>
    </>
  );
};

export default Home;
