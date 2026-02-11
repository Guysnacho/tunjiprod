import { Database } from "@/lib/supabase/types";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useCallback, useState } from "react";

type Video = Database["public"]["Tables"]["videos"]["Row"];

export const MemberContent = ({ videos }: { videos?: Video[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set());

  const isCurrentLoaded = loadedVideos.has(currentIndex);

  const handleLoadVideo = useCallback(() => {
    setLoadedVideos((prev) => new Set(prev).add(currentIndex));
  }, [currentIndex]);

  const handlePrevious = useCallback(() => {
    if (!videos?.length) return;
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  }, [videos?.length]);

  const handleNext = useCallback(() => {
    if (!videos?.length) return;
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  }, [videos?.length]);

  const handleThumbnailClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!videos?.length) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        py="16"
        textAlign="center"
      >
        <Text fontSize="6xl" mb="4">
          🎬
        </Text>
        <Heading
          as="h3"
          fontSize="xl"
          fontWeight="semibold"
          color={{ base: "gray.700", _dark: "gray.300" }}
          mb="2"
        >
          No Recordings Available Yet
        </Heading>
        <Text color={{ base: "gray.500", _dark: "gray.400" }} maxW="md">
          Conference recordings will appear here once they are uploaded. Check
          back after the next conference session.
        </Text>
      </Flex>
    );
  }

  const currentVideo = videos[currentIndex];

  return (
    <Container maxW="5xl" px={{ base: 4, sm: 6, lg: 8 }} py="8">
      {/* Header Section */}
      <Stack gap="2" textAlign="center" mb="8">
        <Heading
          as="h2"
          fontSize="2xl"
          fontWeight="bold"
          color={{ base: "gray.800", _dark: "white" }}
        >
          Conference Recordings
        </Heading>
        <Text
          color={{ base: "gray.600", _dark: "gray.300" }}
          maxW="2xl"
          mx="auto"
        >
          Catch up on sessions you missed or revisit your favorite
          presentations. Browse through our archive of past conference
          recordings below.
        </Text>
      </Stack>

      {/* Main Video Player */}
      <Card.Root
        mb="6"
        overflow="hidden"
        shadow="lg"
        borderWidth="1px"
        borderColor={{ base: "gray.200", _dark: "gray.700" }}
      >
        <Card.Body p="0">
          <Box
            position="relative"
            paddingBottom="56.25%"
            bg={{ base: "gray.900", _dark: "gray.950" }}
            overflow="hidden"
          >
            {!isCurrentLoaded ? (
              // Placeholder State - prevents iframe preloading
              <Box
                position="absolute"
                inset="0"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                onClick={handleLoadVideo}
                role="group"
              >
                <Box
                  position="absolute"
                  inset="0"
                  bgGradient="to-t"
                  gradientFrom="blackAlpha.600"
                  gradientVia="transparent"
                  gradientTo="transparent"
                />
                <Stack gap="4" align="center" zIndex="10">
                  <Flex
                    w="20"
                    h="20"
                    rounded="full"
                    bg="whiteAlpha.900"
                    align="center"
                    justify="center"
                    shadow="lg"
                    transition="transform 0.2s"
                    _groupHover={{ transform: "scale(1.1)" }}
                  >
                    <Icon boxSize="8" color="gray.800" ml="1">
                      <Play />
                    </Icon>
                  </Flex>
                  <Text color="white" fontSize="sm" fontWeight="medium">
                    Click to play
                  </Text>
                </Stack>
              </Box>
            ) : (
              <iframe
                src={currentVideo.path}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            )}
          </Box>

          {/* Video Info */}
          <Box p="6">
            <Flex align="start" justify="space-between">
              <Box>
                <Heading
                  as="h3"
                  fontSize="xl"
                  fontWeight="semibold"
                  color={{ base: "gray.800", _dark: "white" }}
                  mb="1"
                >
                  {currentVideo.title || "Untitled Session"}
                </Heading>
                <Text
                  color={{ base: "gray.500", _dark: "gray.400" }}
                  fontSize="sm"
                >
                  {formatDate(currentVideo.date)}
                </Text>
              </Box>
              <Text
                fontSize="sm"
                color={{ base: "gray.400", _dark: "gray.500" }}
              >
                {currentIndex + 1} of {videos.length}
              </Text>
            </Flex>
          </Box>
        </Card.Body>
      </Card.Root>

      {/* Navigation Controls */}
      <Flex align="center" justify="center" gap="4" mb="8">
        <Button
          onClick={handlePrevious}
          variant="outline"
          colorPalette="gray"
          aria-label="Previous video"
        >
          <Icon boxSize="5">
            <ChevronLeft />
          </Icon>
          Previous
        </Button>
        <Button
          onClick={handleNext}
          variant="outline"
          colorPalette="gray"
          aria-label="Next video"
        >
          Next
          <Icon boxSize="5">
            <ChevronRight />
          </Icon>
        </Button>
      </Flex>

      {/* Thumbnail Strip */}
      {videos.length > 1 && (
        <Box
          borderTopWidth="1px"
          borderColor={{ base: "gray.200", _dark: "gray.700" }}
          pt="6"
        >
          <Heading
            as="h4"
            fontSize="sm"
            fontWeight="medium"
            color={{ base: "gray.500", _dark: "gray.400" }}
            textTransform="uppercase"
            letterSpacing="wide"
            mb="4"
          >
            All Recordings ({videos.length})
          </Heading>
          <Flex
            gap="3"
            overflowX="auto"
            pb="4"
            css={{
              "&::-webkit-scrollbar": {
                height: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "gray.300",
                borderRadius: "3px",
              },
            }}
          >
            {videos.map((video, index) => (
              <Box
                as="button"
                key={video.id}
                onClick={() => handleThumbnailClick(index)}
                flexShrink={0}
                w="48"
                rounded="lg"
                overflow="hidden"
                transition="all 0.2s"
                borderWidth="2px"
                borderColor={
                  index === currentIndex
                    ? { base: "blue.500", _dark: "blue.400" }
                    : "transparent"
                }
                opacity={index === currentIndex ? 1 : 0.7}
                _hover={{ opacity: 1 }}
              >
                <Flex
                  bg={{ base: "gray.800", _dark: "gray.900" }}
                  aspectRatio="16/9"
                  align="center"
                  justify="center"
                >
                  <Icon boxSize="8" color="whiteAlpha.600">
                    <Play />
                  </Icon>
                </Flex>
                <Box
                  p="2"
                  bg={{ base: "gray.50", _dark: "gray.800" }}
                  textAlign="left"
                >
                  <Text
                    fontSize="xs"
                    fontWeight="medium"
                    color={{ base: "gray.700", _dark: "gray.300" }}
                    lineClamp={1}
                  >
                    {video.title || "Untitled"}
                  </Text>
                  <Text
                    fontSize="xs"
                    color={{ base: "gray.400", _dark: "gray.500" }}
                  >
                    {formatDate(video.date)}
                  </Text>
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>
      )}

      {/* Helper Text */}
      <Text
        textAlign="center"
        fontSize="sm"
        color={{ base: "gray.400", _dark: "gray.500" }}
        mt="6"
      >
        Having trouble viewing? Try refreshing the page or contact support.
      </Text>
    </Container>
  );
};

export default MemberContent;
