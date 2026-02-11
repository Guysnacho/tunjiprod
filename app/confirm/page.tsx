"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import {
  AlertTriangle,
  ChevronLeft,
  Clapperboard,
  Headphones,
  Layers,
  Palette,
  Sparkles,
  Users,
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { use } from "react";
import { LuCircleCheck, LuPartyPopper } from "react-icons/lu";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = use(searchParams);
  const isValid = params.token;

  return (
    <>
      <Head>
        <title>Signup Confirmation</title>
        <meta content="The Soapbox | Membership Confirmation" />
      </Head>

      {/* Hero Section */}
      <Box
        as="section"
        pt="40"
        pb="16"
        bg={{ base: "gray.50", _dark: "gray.900" }}
        position="relative"
        overflow="hidden"
      >
        <Container
          maxW="6xl"
          px={{ base: 4, sm: 6, lg: 8 }}
          position="relative"
          zIndex="10"
        >
          <Box maxW="2xl" mx="auto" textAlign="center">
            {isValid ? (
              <>
                <Flex align="center" gap="3" mb="4" justify="center">
                  <Flex
                    p="3"
                    bg="emerald.100"
                    _dark={{ bg: "emerald.900" }}
                    rounded="xl"
                    align="center"
                    justify="center"
                  >
                    <Icon color="emerald.700" _dark={{ color: "emerald.400" }} boxSize="6">
                      <LuPartyPopper />
                    </Icon>
                  </Flex>
                  <Text
                    fontSize="sm"
                    fontWeight="bold"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    color="emerald.700"
                    _dark={{ color: "emerald.400" }}
                  >
                    Welcome Aboard
                  </Text>
                </Flex>
                <Heading
                  as="h1"
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontWeight="black"
                  color={{ base: "gray.900", _dark: "white" }}
                  mb="4"
                  lineHeight="tight"
                >
                  Welcome to The Soapbox
                </Heading>
                <Text fontSize="lg" color={{ base: "gray.600", _dark: "gray.300" }} lineHeight="relaxed">
                  Thank you for joining our community. Your membership gives
                  you access to installations, screenings, workshops, and
                  exclusive events.
                </Text>
              </>
            ) : (
              <>
                <Flex align="center" gap="3" mb="4" justify="center">
                  <Flex
                    p="3"
                    bg="orange.100"
                    _dark={{ bg: "orange.900" }}
                    rounded="xl"
                    align="center"
                    justify="center"
                  >
                    <Icon color="orange.700" _dark={{ color: "orange.400" }} boxSize="6">
                      <AlertTriangle />
                    </Icon>
                  </Flex>
                  <Text
                    fontSize="sm"
                    fontWeight="bold"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    color="orange.700"
                    _dark={{ color: "orange.400" }}
                  >
                    Oops
                  </Text>
                </Flex>
                <Heading
                  as="h1"
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontWeight="black"
                  color={{ base: "gray.900", _dark: "white" }}
                  mb="4"
                  lineHeight="tight"
                >
                  Something Went Wrong
                </Heading>
                <Text fontSize="lg" color={{ base: "gray.600", _dark: "gray.300" }} lineHeight="relaxed">
                  If you were in the middle of a registration, please try
                  again later or reach out to us. If you got here by accident,
                  no worries!
                </Text>
              </>
            )}

            <Button
              asChild
              mt="8"
              size="lg"
              bg={isValid ? "cyan.500" : "orange.600"}
              color={isValid ? "gray.950" : "white"}
              fontWeight="bold"
              _hover={{ bg: isValid ? "cyan.400" : "orange.700" }}
            >
              <Link href="/">
                <ChevronLeft size={18} />
                Return Home
              </Link>
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Benefits Section - Only show if valid */}
      {isValid && (
        <Box
          as="section"
          py="20"
          bg={{ base: "white", _dark: "gray.950" }}
          position="relative"
          overflow="hidden"
        >
          <Container
            maxW="6xl"
            px={{ base: 4, sm: 6, lg: 8 }}
            position="relative"
            zIndex="10"
          >
            <Flex align="center" gap="3" mb="3" justify="center">
              <Icon color="cyan.600" _dark={{ color: "cyan.400" }} boxSize="5">
                <Sparkles />
              </Icon>
              <Text
                fontSize="sm"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="widest"
                color="cyan.600"
                _dark={{ color: "cyan.400" }}
              >
                Member Benefits
              </Text>
            </Flex>
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="black"
              color={{ base: "gray.900", _dark: "white" }}
              mb="12"
              textAlign="center"
            >
              What You Get as a Member
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
              {perks.map((perk, idx) => (
                <Box
                  key={idx}
                  p="6"
                  bg={{ base: "gray.50", _dark: "gray.800" }}
                  rounded="2xl"
                  borderWidth="1px"
                  borderColor={{ base: "gray.200", _dark: "gray.700" }}
                  transition="all 0.2s"
                  _hover={{ borderColor: "cyan.300", shadow: "md", _dark: { borderColor: "cyan.700" } }}
                >
                  <Flex
                    w="12"
                    h="12"
                    bg="cyan.50"
                    _dark={{ bg: "cyan.950" }}
                    rounded="xl"
                    align="center"
                    justify="center"
                    mb="4"
                  >
                    <Icon color="cyan.600" _dark={{ color: "cyan.400" }} boxSize="6">
                      <perk.icon />
                    </Icon>
                  </Flex>
                  <Heading
                    as="h3"
                    fontSize="md"
                    fontWeight="bold"
                    color={{ base: "gray.900", _dark: "white" }}
                    mb="2"
                  >
                    {perk.heading}
                  </Heading>
                  <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.400" }} lineHeight="relaxed">
                    {perk.blurb}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>

            <Flex
              mt="12"
              p="6"
              bg="emerald.50"
              _dark={{ bg: "emerald.950" }}
              rounded="2xl"
              borderWidth="1px"
              borderColor="emerald.200"
              _dark-2={{ borderColor: "emerald.800" }}
              align="center"
              justify="center"
              gap="3"
            >
              <Icon color="emerald.600" _dark={{ color: "emerald.400" }} boxSize="5">
                <LuCircleCheck />
              </Icon>
              <Text color="emerald.800" _dark={{ color: "emerald.200" }} fontWeight="medium">
                Your membership is now active. Check your email for next steps!
              </Text>
            </Flex>
          </Container>
        </Box>
      )}
    </>
  );
}

const perks = [
  {
    icon: Layers,
    heading: "4D Installations Access",
    blurb:
      "Experience immersive art installations that respond to your presence and evolve over time.",
  },
  {
    icon: Clapperboard,
    heading: "5D Film Screenings",
    blurb:
      "Priority access to multi-sensory film premieres and experimental cinema events.",
  },
  {
    icon: Headphones,
    heading: "Sound Design Sessions",
    blurb:
      "Attend spatial audio workshops and experimental music performances by leading artists.",
  },
  {
    icon: Palette,
    heading: "Creative Workshops",
    blurb:
      "Hands-on sessions in projection mapping, generative art, and creative coding.",
  },
  {
    icon: Users,
    heading: "Community Network",
    blurb:
      "Connect with artists, filmmakers, and technologists shaping the future of creative expression.",
  },
  {
    icon: Sparkles,
    heading: "On-Demand Content",
    blurb:
      "Access a growing library of session recordings, artist interviews, and workshop materials.",
  },
];
