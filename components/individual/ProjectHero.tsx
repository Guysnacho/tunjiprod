import { Alert, AlertTitle, Container, Grid, Typography } from "@mui/material";
import { Octokit } from "octokit";
import useSWR from "swr";
import Single from "./EP";

const octokit = new Octokit();

/**
 * @fileoverview List of my most recent and proud projects
 * @function ProjectHero
 * @todo Add a highlight on a personal favorite. Maybe a glow animation
 */
const ProjectHero = () => {
  const {
    data: repos,
    error,
    isLoading,
  } = useSWR("repos", () =>
    octokit.request(
      "GET /users/Guysnacho/repos?sort=updated_at&direction=desc&per_page=8"
    )
  );

  return (
    <>
      <Container sx={{ py: 3 }}>
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ userSelect: "none", my: 10 }}
        >
          Projects
        </Typography>
      </Container>
      {error ? ( // Failed to fetch repos
        <Alert color="error" sx={{ mx: "auto" }} variant="filled">
          <AlertTitle>MTV killed the radio star™</AlertTitle>
          {`${error}\nYeesh, sound issues. One sec..`}
        </Alert>
      ) : undefined}
      <Grid
        container
        sx={{
          display: "flex",
          flexFlow: "wrap",
        }}
      >
        {repos?.data.map((repo: any, index: number) => (
          <Grid item xs={12} sm={6} px="auto" py={4} m="auto" key={index}>
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

export default ProjectHero;
