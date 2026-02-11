"use client";

import { Box, Button, Center, Container } from "@chakra-ui/react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container>
      <Center>
        <Box my="36">
          <h2 className="text-2xl text-center">
            Something went wrong while fetching your transaction!
          </h2>
          <Button
            onClick={
              // Attempt to recover by trying to re-render the booking
              () => reset()
            }
          >
            Try again
          </Button>
        </Box>
      </Center>
    </Container>
  );
}
