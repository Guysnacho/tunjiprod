import { Octokit } from "octokit";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  switch (event.method) {
    case "GET":
      const octo = new Octokit({
        userAgent: "tunjiprod/2.0.0",
        auth: config.githubToken,
      });
      const { data } =
        await octo.rest.repos.listForAuthenticatedUser({
          sort: "pushed",
          per_page: 12,
          affiliation: "owner"
        });

      return data;
      break;

    default:
      throw createError({
        statusCode: 404,
      });
      break;
  }
});
