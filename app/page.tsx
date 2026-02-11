"use client";

import { MembershipPlans } from "@/components/MembershipPlans";
import { toaster } from "@/components/ui/toaster";
import { membershipBenefits } from "@/lib/constants";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  ArrowRight,
  CheckCircle,
  Clapperboard,
  Eye,
  Headphones,
  Layers,
  Palette,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = use(searchParams);
  const router = useRouter();

  setTimeout(() => {
    if (params.error_description) {
      toaster.create({
        description: params.error_description,
        type: "warning",
        duration: 8000,
        closable: true,
      });
    } else if (params.token || params.code) {
      toaster.create({
        title: "Thank you for your verification",
        description:
          "You are free to continue with your registration or any other activities!",
        type: "success",
        duration: 8000,
        closable: true,
      });
    }
  }, 500);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        position="relative"
        overflow="hidden"
        bg="gray.950"
        _dark={{ bg: "black" }}
      >
        {/* Subtle gradient overlay */}
        <Box
          position="absolute"
          inset={0}
          bgGradient="to-br"
          gradientFrom="cyan.950/30"
          gradientVia="transparent"
          gradientTo="purple.950/20"
        />

        <Container maxW="7xl" py={{ base: 20, md: 32 }} position="relative">
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={{ base: 10, lg: 16 }}
            alignItems="center"
          >
            {/* Left Content */}
            <GridItem>
              <Stack gap={6}>
                {/* Badge */}
                <Badge
                  colorPalette="cyan"
                  variant="subtle"
                  px={3}
                  py={1}
                  borderRadius="full"
                  w="fit-content"
                  fontSize="xs"
                  fontWeight={600}
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  <Flex align="center" gap={2}>
                    <Box w={2} h={2} bg="cyan.400" borderRadius="full" />
                    Registration Open
                  </Flex>
                </Badge>

                {/* Headline */}
                <Heading
                  as="h1"
                  fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                  fontWeight={700}
                  lineHeight={1.1}
                  color="white"
                >
                  <Text as="span" color="cyan.400">
                    The Soapbox
                  </Text>
                  <br />
                  Music & Art
                  <br />
                  <Text as="span" color="purple.400">
                    Conference
                  </Text>
                </Heading>

                {/* Subtext */}
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color="gray.400"
                  maxW="lg"
                >
                  Exploring 4D artforms and 5D film. A convergence of sound
                  design, immersive installations, and boundary-pushing visual
                  narratives.
                </Text>

                {/* CTA Buttons */}
                <Flex gap={4} flexWrap="wrap">
                  <Button
                    size="lg"
                    bg="cyan.500"
                    color="gray.950"
                    fontWeight={600}
                    _hover={{ bg: "cyan.400" }}
                    onClick={() => router.push("/events")}
                  >
                    Register Now
                    <ArrowRight size={18} />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    borderColor="gray.600"
                    color="gray.200"
                    fontWeight={500}
                    _hover={{ borderColor: "cyan.500", color: "cyan.400" }}
                    onClick={() => router.push("/membership")}
                  >
                    Join the Community
                  </Button>
                </Flex>

                {/* Stats */}
                <Flex gap={{ base: 6, md: 10 }} mt={4} flexWrap="wrap">
                  {stats.map((stat) => (
                    <Box key={stat.label}>
                      <Text
                        fontSize={{ base: "2xl", md: "3xl" }}
                        fontWeight={700}
                        color="cyan.400"
                      >
                        {stat.value}
                      </Text>
                      <Text
                        fontSize="xs"
                        color="gray.500"
                        textTransform="uppercase"
                        letterSpacing="wide"
                      >
                        {stat.label}
                      </Text>
                    </Box>
                  ))}
                </Flex>
              </Stack>
            </GridItem>

            {/* Right Content - Abstract visual */}
            <GridItem position="relative">
              <Box
                position="relative"
                borderRadius="32px"
                overflow="hidden"
                border="1px solid"
                borderColor="gray.800"
                bg="gray.900"
                p={{ base: 8, md: 12 }}
                minH={{ base: "300px", md: "400px" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {/* Abstract geometric decoration */}
                <Box
                  position="absolute"
                  inset={0}
                  bgGradient="to-br"
                  gradientFrom="cyan.900/20"
                  gradientTo="purple.900/20"
                />
                <Stack gap={4} textAlign="center" position="relative">
                  <Text
                    fontSize={{ base: "6xl", md: "8xl" }}
                    fontWeight={900}
                    color="cyan.400/20"
                    lineHeight={1}
                  >
                    4D
                  </Text>
                  <Text
                    fontSize="sm"
                    fontWeight={600}
                    textTransform="uppercase"
                    letterSpacing="widest"
                    color="gray.500"
                  >
                    Art Beyond Dimensions
                  </Text>
                  <Text
                    fontSize={{ base: "6xl", md: "8xl" }}
                    fontWeight={900}
                    color="purple.400/20"
                    lineHeight={1}
                  >
                    5D
                  </Text>
                  <Text
                    fontSize="sm"
                    fontWeight={600}
                    textTransform="uppercase"
                    letterSpacing="widest"
                    color="gray.500"
                  >
                    Film Beyond Sight
                  </Text>
                </Stack>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Mission Pillars Section */}
      <Box
        py={{ base: 16, md: 24 }}
        bg="white"
        _dark={{ bg: "gray.900" }}
        position="relative"
      >
        <Container maxW="7xl" position="relative">
          <Stack gap={12}>
            {/* Section Header */}
            <Box textAlign="center" maxW="2xl" mx="auto">
              <Text
                fontSize="sm"
                fontWeight={600}
                textTransform="uppercase"
                letterSpacing="wider"
                color="cyan.600"
                _dark={{ color: "cyan.400" }}
                mb={2}
              >
                Our Vision
              </Text>
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontWeight={700}
                color="gray.900"
                _dark={{ color: "white" }}
                mb={4}
              >
                Where Art Meets the Future
              </Heading>
              <Text
                color="gray.600"
                _dark={{ color: "gray.400" }}
                fontSize={{ base: "md", md: "lg" }}
              >
                The Soapbox is a platform for artists, filmmakers, musicians,
                and technologists to present work that challenges perception.
              </Text>
            </Box>

            {/* Pillars Grid */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {pillars.map((pillar) => (
                <Card.Root
                  key={pillar.title}
                  bg="gray.50"
                  _dark={{ bg: "gray.800", borderColor: "gray.700" }}
                  borderRadius="xl"
                  p={6}
                  boxShadow="sm"
                  borderWidth="1px"
                  borderColor="gray.100"
                  transition="all 0.2s"
                  _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
                >
                  <Stack gap={4}>
                    <Flex
                      w={12}
                      h={12}
                      bg="cyan.50"
                      _dark={{ bg: "cyan.950" }}
                      borderRadius="lg"
                      align="center"
                      justify="center"
                    >
                      <Icon color="cyan.600" _dark={{ color: "cyan.400" }}>
                        <pillar.icon size={24} />
                      </Icon>
                    </Flex>
                    <Heading
                      as="h3"
                      fontSize="lg"
                      fontWeight={600}
                      color="gray.900"
                      _dark={{ color: "white" }}
                    >
                      {pillar.title}
                    </Heading>
                    <Text
                      fontSize="sm"
                      color="gray.600"
                      _dark={{ color: "gray.400" }}
                    >
                      {pillar.description}
                    </Text>
                  </Stack>
                </Card.Root>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* Membership Section */}
      <Box
        py={{ base: 16, md: 24 }}
        bg="gray.900"
        _dark={{ bg: "gray.950" }}
        position="relative"
        overflow="hidden"
      >
        <Container maxW="7xl" position="relative">
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={{ base: 12, lg: 16 }}
            alignItems="start"
          >
            {/* Left - Benefits */}
            <Stack gap={8}>
              <Box>
                <Heading
                  as="h2"
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight={700}
                  color="white"
                  mb={4}
                >
                  Join The Soapbox Community
                </Heading>
                <Text color="gray.300" fontSize="lg">
                  Unlock full access to screenings, installations, workshops,
                  and exclusive community events.
                </Text>
              </Box>

              <Stack gap={3}>
                {membershipBenefits.map((benefit) => (
                  <Flex key={benefit} align="center" gap={3}>
                    <Flex
                      w={6}
                      h={6}
                      bg="cyan.600"
                      borderRadius="full"
                      align="center"
                      justify="center"
                      flexShrink={0}
                    >
                      <CheckCircle size={14} color="white" />
                    </Flex>
                    <Text
                      color="gray.200"
                      fontSize="sm"
                      textTransform="uppercase"
                      letterSpacing="wide"
                    >
                      {benefit}
                    </Text>
                  </Flex>
                ))}
              </Stack>

              <Flex gap={4} align="center" mt={4}>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="white"
                  color="white"
                  _hover={{ bg: "whiteAlpha.100" }}
                  onClick={() => router.push("/membership")}
                >
                  Join Now
                </Button>
              </Flex>
            </Stack>

            {/* Right - Pricing Cards */}
            <MembershipPlans
              variant="card"
              onPlanSelect={() => router.push("/membership")}
            />
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        py={{ base: 16, md: 24 }}
        bg="gray.100"
        _dark={{ bg: "gray.900" }}
        position="relative"
      >
        <Container maxW="4xl">
          <Card.Root
            bg="white"
            _dark={{ bg: "gray.800" }}
            borderRadius="2xl"
            boxShadow="xl"
            overflow="hidden"
            position="relative"
          >
            <Box p={{ base: 8, md: 12 }} textAlign="center" position="relative">
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight={700}
                color="gray.900"
                _dark={{ color: "white" }}
                mb={4}
              >
                Ready to experience the future of art?
              </Heading>
              <Text
                color="gray.600"
                _dark={{ color: "gray.400" }}
                mb={8}
                maxW="lg"
                mx="auto"
              >
                Join our community of artists, filmmakers, musicians, and
                visionaries shaping the next dimension of creative expression.
              </Text>
              <Flex gap={4} justify="center" flexWrap="wrap">
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="gray.300"
                  color="gray.700"
                  _dark={{ borderColor: "gray.600", color: "gray.200" }}
                  fontWeight={500}
                  onClick={() => router.push("/events")}
                >
                  View Events
                </Button>
                <Button
                  size="lg"
                  bg="cyan.500"
                  color="gray.950"
                  fontWeight={600}
                  _hover={{ bg: "cyan.400" }}
                  onClick={() => router.push("/membership")}
                >
                  Become a Member
                </Button>
              </Flex>
            </Box>
          </Card.Root>
        </Container>
      </Box>
    </Box>
  );
}

const stats = [
  { value: "4D", label: "Art Dimensions" },
  { value: "5D", label: "Film Experience" },
  { value: "50+", label: "Artists & Creators" },
];

const pillars = [
  {
    icon: Layers,
    title: "4D Art Installations",
    description:
      "Interactive installations that incorporate time as a medium. Art that evolves, responds, and transforms in the presence of its audience.",
  },
  {
    icon: Clapperboard,
    title: "5D Film Screenings",
    description:
      "Cinema beyond sight and sound. Multi-sensory film experiences that engage touch, movement, and spatial awareness.",
  },
  {
    icon: Headphones,
    title: "Sound Design",
    description:
      "Spatial audio, generative soundscapes, and experimental music pushing the boundaries of what we hear and feel.",
  },
  {
    icon: Palette,
    title: "Visual Narratives",
    description:
      "From projection mapping to digital sculpture, visual storytelling that transcends traditional gallery walls.",
  },
  {
    icon: Sparkles,
    title: "Creative Technology",
    description:
      "The intersection of code, hardware, and human expression. Tools and techniques for the next generation of artists.",
  },
  {
    icon: Eye,
    title: "Perception Studies",
    description:
      "Exploring how art alters consciousness, challenges assumptions, and expands our understanding of reality.",
  },
];
