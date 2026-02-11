"use client";

import { ConferenceRegistration } from "@/components/ConferenceRegistration";
import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import { LuClock, LuLock, LuShieldCheck } from "react-icons/lu";

export default function Page() {
  const [password, setPassword] = useState("");
  const isAuthenticated = password === process.env.NEXT_PUBLIC_LATE_REGISTRATION;

  return (
    <>
      <Head>
        <title>Late Registration | The Soapbox</title>
        <meta content="Late Registration | The Soapbox" />
      </Head>

      {/* Hero Section */}
      <Box as="section" pt="40" pb="16" bg={{ base: "gray.50", _dark: "gray.900" }} position="relative" overflow="hidden">
        <Container maxW="4xl" px={{ base: 4, sm: 6, lg: 8 }} position="relative" zIndex="10">
          <Flex align="center" gap="3" mb="4" justify="center">
            <Flex p="3" bg="orange.100" _dark={{ bg: "orange.900" }} rounded="xl" align="center" justify="center">
              <Icon color="orange.700" _dark={{ color: "orange.400" }} boxSize="6">
                <LuClock />
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
              Extended Access
            </Text>
          </Flex>
          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight="black"
            color={{ base: "gray.900", _dark: "white" }}
            mb="4"
            lineHeight="tight"
            textAlign="center"
          >
            Late Registration
          </Heading>
          <Text fontSize="lg" color={{ base: "gray.600", _dark: "gray.300" }} lineHeight="relaxed" textAlign="center" maxW="2xl" mx="auto">
            {isAuthenticated
              ? "You have access to late registration. Complete your conference registration below."
              : "This page requires administrator access. Please enter your provided password to continue."}
          </Text>
        </Container>
      </Box>

      {/* Content Section */}
      <Box as="section" py="16" bg={{ base: "white", _dark: "gray.950" }} position="relative" overflow="hidden">
        <Container maxW="4xl" px={{ base: 4, sm: 6, lg: 8 }} position="relative" zIndex="10">
          {isAuthenticated ? (
            <Box>
              <Flex
                mb="8"
                p="4"
                bg="emerald.50"
                _dark={{ bg: "emerald.950" }}
                rounded="xl"
                borderWidth="1px"
                borderColor="emerald.200"
                align="center"
                justify="center"
                gap="3"
              >
                <Icon color="emerald.600" _dark={{ color: "emerald.400" }} boxSize="5">
                  <LuShieldCheck />
                </Icon>
                <Text color="emerald.800" _dark={{ color: "emerald.200" }} fontWeight="medium" fontSize="sm">
                  Access granted. You may proceed with registration.
                </Text>
              </Flex>
              <ConferenceRegistration />
            </Box>
          ) : (
            <Box maxW="md" mx="auto">
              <Box
                p={{ base: 6, md: 8 }}
                bg={{ base: "gray.50", _dark: "gray.800" }}
                rounded="2xl"
                borderWidth="1px"
                borderColor={{ base: "gray.200", _dark: "gray.700" }}
              >
                <Flex
                  w="16"
                  h="16"
                  bg={{ base: "gray.200", _dark: "gray.700" }}
                  rounded="full"
                  align="center"
                  justify="center"
                  mx="auto"
                  mb="6"
                >
                  <Icon color={{ base: "gray.500", _dark: "gray.400" }} boxSize="8">
                    <LuLock />
                  </Icon>
                </Flex>
                <Heading
                  as="h2"
                  fontSize="lg"
                  fontWeight="bold"
                  color={{ base: "gray.900", _dark: "white" }}
                  mb="2"
                  textAlign="center"
                >
                  Administrator Access Required
                </Heading>
                <Text fontSize="sm" color={{ base: "gray.500", _dark: "gray.400" }} mb="6" textAlign="center">
                  Please enter your administrator-provided password to access late registration.
                </Text>
                <Input
                  type="password"
                  placeholder="Enter password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  disabled
                />
                <Text fontSize="xs" color={{ base: "gray.400", _dark: "gray.500" }} mt="3" textAlign="center">
                  Late registration is currently closed
                </Text>
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}
