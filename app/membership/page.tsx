"use client";

import { AuthModal } from "@/components/AuthModal";
import { MembershipPlan, MembershipPlans } from "@/components/MembershipPlans";
import { membershipBenefits } from "@/lib/constants";
import { useUserStore } from "@/lib/store";
import useStore from "@/lib/store/useStore";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { LuCircleCheck, LuShieldCheck } from "react-icons/lu";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const store = useStore(useUserStore, (store) => store);
  const router = useRouter();
  const params = use(searchParams);
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  useEffect(() => {
    if (isAuthOpen) {
      if (store?.id) {
        router.push("/dashboard");
      }
    }
  }, [isAuthOpen, router, store?.id]);

  useEffect(() => {
    if (params.registration) {
      setAuthOpen(true);
    } else if (params.reset) {
      setIsSignUp(false);
      setAuthOpen(true);
    }
  }, [params]);

  const handlePlanSelect = (_plan: MembershipPlan) => {
    setIsSignUp(true);
    setAuthOpen(true);
  };

  const handleJoinClick = () => {
    setIsSignUp(true);
    setAuthOpen(true);
  };

  return (
    <>
      <AuthModal
        isOpen={isAuthOpen}
        setIsOpen={setAuthOpen}
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
      />

      {/* Hero Section */}
      <Box
        as="section"
        pt="40"
        pb="20"
        bg={{ base: "gray.50", _dark: "gray.900" }}
        borderBottomWidth="1px"
        borderColor={{ base: "gray.200", _dark: "gray.700" }}
      >
        <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
          <Box maxW="3xl">
            <Heading
              as="h1"
              fontSize={["4xl", null, "6xl"]}
              fontWeight="black"
              color={{ base: "gray.900", _dark: "white" }}
              mb="6"
            >
              Membership
            </Heading>
            <Text fontSize="xl" color={{ base: "gray.600", _dark: "gray.300" }} lineHeight="relaxed">
              Join The Soapbox community and unlock full access to immersive
              experiences, workshops, and exclusive events.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* Main Membership Section */}
      <Box
        as="section"
        py="24"
        bg={{ base: "white", _dark: "gray.950" }}
        position="relative"
        overflow="hidden"
      >
        <Container
          maxW="7xl"
          px={{ base: 4, sm: 6, lg: 8 }}
          position="relative"
          zIndex="10"
        >
          <Box
            bg="gray.950"
            _dark={{ bg: "black" }}
            rounded="48px"
            overflow="hidden"
            shadow="2xl"
            borderWidth="1px"
            borderColor="gray.800"
          >
            <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }}>
              {/* Left Panel - Benefits */}
              <GridItem
                p={{ base: 10, lg: 24 }}
                color="white"
                bgGradient="to-br"
                gradientFrom="cyan.900"
                gradientTo="purple.900"
              >
                <Heading
                  as="h2"
                  fontSize="4xl"
                  fontWeight="black"
                  mb="8"
                  letterSpacing="tight"
                >
                  Join The Soapbox Community
                </Heading>
                <Text
                  color="cyan.100"
                  fontSize="xl"
                  mb="12"
                  lineHeight="relaxed"
                  fontWeight="medium"
                >
                  Unlock immersive experiences and connect with artists,
                  filmmakers, and technologists.
                </Text>

                <Stack gap="6" mb="16">
                  {membershipBenefits.map((benefit, idx) => (
                    <Flex key={idx} align="center" gap="4">
                      <Flex p="1" bg="whiteAlpha.200" rounded="full">
                        <Icon color="cyan.200" boxSize="5" flexShrink={0}>
                          <LuCircleCheck />
                        </Icon>
                      </Flex>
                      <Text
                        fontWeight="bold"
                        letterSpacing="wide"
                        fontSize="sm"
                        textTransform="uppercase"
                      >
                        {benefit}
                      </Text>
                    </Flex>
                  ))}
                </Stack>

                <Flex
                  direction={{ base: "column", sm: "row" }}
                  gap="6"
                  align="center"
                >
                  <Button
                    bg="white"
                    color="gray.900"
                    px="10"
                    py="5"
                    rounded="xl"
                    fontWeight="black"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    fontSize="xs"
                    _hover={{ bg: "gray.100" }}
                    shadow="2xl"
                    onClick={handleJoinClick}
                  >
                    Join Now
                  </Button>
                </Flex>
              </GridItem>

              {/* Right Panel - Pricing */}
              <GridItem
                bg={{ base: "white", _dark: "gray.950" }}
                p={{ base: 10, lg: 24 }}
                borderLeftWidth={{ lg: "1px" }}
                borderColor={{ base: "gray.100", _dark: "gray.800" }}
                position="relative"
              >
                <Heading
                  as="h3"
                  fontSize="2xl"
                  fontWeight="black"
                  color={{ base: "gray.900", _dark: "white" }}
                  mb="10"
                  textTransform="uppercase"
                  letterSpacing="widest"
                >
                  Membership Plans
                </Heading>

                <MembershipPlans
                  variant="inline"
                  onPlanSelect={handlePlanSelect}
                  showNote={true}
                />
              </GridItem>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Additional Info Section */}
      <Box as="section" py="16" bg={{ base: "gray.50", _dark: "gray.900" }}>
        <Container maxW="4xl" px={{ base: 4, sm: 6, lg: 8 }}>
          <Stack gap="8" textAlign="center">
            <Heading as="h3" fontSize="2xl" fontWeight="bold" color={{ base: "gray.900", _dark: "white" }}>
              Simple and Transparent Pricing
            </Heading>
            <Stack gap="4">
              <Box
                bg={{ base: "white", _dark: "gray.800" }}
                p="6"
                rounded="2xl"
                borderWidth="1px"
                borderColor={{ base: "gray.200", _dark: "gray.700" }}
              >
                <Text color={{ base: "gray.700", _dark: "gray.300" }}>
                  <Text as="span" fontWeight="bold">
                    Conference Attendees:{" "}
                  </Text>
                  Your conference registration fee automatically includes
                  a one-year community membership.
                </Text>
              </Box>
              <Box
                bg={{ base: "white", _dark: "gray.800" }}
                p="6"
                rounded="2xl"
                borderWidth="1px"
                borderColor={{ base: "gray.200", _dark: "gray.700" }}
              >
                <Text color={{ base: "gray.700", _dark: "gray.300" }}>
                  <Text as="span" fontWeight="bold">
                    Direct Membership:{" "}
                  </Text>
                  Want to join without attending the conference? Direct
                  membership options are available at introductory rates.
                </Text>
              </Box>
            </Stack>

            <Flex
              bg={{ base: "emerald.50", _dark: "emerald.950" }}
              p="6"
              rounded="2xl"
              borderWidth="1px"
              borderColor={{ base: "emerald.200", _dark: "emerald.800" }}
              align="center"
              justify="center"
              gap="4"
            >
              <Icon color={{ base: "emerald.600", _dark: "emerald.400" }} boxSize="6">
                <LuShieldCheck />
              </Icon>
              <Text color={{ base: "emerald.800", _dark: "emerald.200" }} fontWeight="medium">
                The Soapbox registration is now open
              </Text>
            </Flex>

            <Button
              size="lg"
              bg="cyan.500"
              color="gray.950"
              fontWeight="600"
              _hover={{ bg: "cyan.400" }}
              onClick={handleJoinClick}
              alignSelf="center"
            >
              Sign Up Now
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
