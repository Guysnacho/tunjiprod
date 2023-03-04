import useSWR from "swr";

function useSearch(title: string, artist: string) {
  const { data, error, isLoading } = useSWR(`/api/search/${title}`, () => {
    fetch(
      `https://api.spotify.com/v1/search?type=track&track=${title}&artist=${artist}`
    );
  });

  return {
    data: data,
    isLoading,
    isError: error,
  };
}
