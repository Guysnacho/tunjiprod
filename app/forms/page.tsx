"use client";

import { NameTagForm } from "@/components/forms/NameTagForm";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import { LuClipboardList, LuFileText, LuLock } from "react-icons/lu";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Forms | The Soapbox</title>
        <meta content="Forms | The Soapbox" />
      </Head>
      <NameTagForm isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Hero Section */}
      <Box as="section" pt="40" pb="16" bg={{ base: "gray.50", _dark: "gray.900" }} position="relative" overflow="hidden">
        <Container maxW="6xl" px={{ base: 4, sm: 6, lg: 8 }} position="relative" zIndex="10">
          <Box maxW="2xl" mx="auto" textAlign="center">
            <Flex align="center" gap="3" mb="4" justify="center">
              <Flex p="3" bg="cyan.50" _dark={{ bg: "cyan.950" }} rounded="xl" align="center" justify="center">
                <Icon color="cyan.600" _dark={{ color: "cyan.400" }} boxSize="6">
                  <LuClipboardList />
                </Icon>
              </Flex>
              <Text
                fontSize="sm"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="widest"
                color="cyan.600"
                _dark={{ color: "cyan.400" }}
              >
                Resources
              </Text>
            </Flex>
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "5xl" }}
              fontWeight="black"
              color={{ base: "gray.900", _dark: "white" }}
              mb="4"
              lineHeight="tight"
            >
              Forms
            </Heading>
            <Text fontSize="lg" color={{ base: "gray.600", _dark: "gray.300" }} lineHeight="relaxed">
              Access official forms for conference registration, name tags, and other
              event-related submissions.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* Forms Section */}
      <Box as="section" py="20" bg={{ base: "white", _dark: "gray.950" }} position="relative" overflow="hidden">
        <Container maxW="3xl" px={{ base: 4, sm: 6, lg: 8 }} position="relative" zIndex="10">
          <Stack gap="6">
            {/* Name Tag Form Card */}
            <Box
              p={{ base: 6, md: 8 }}
              bg={{ base: "gray.50", _dark: "gray.800" }}
              rounded="2xl"
              borderWidth="1px"
              borderColor={{ base: "gray.200", _dark: "gray.700" }}
            >
              <Flex
                direction={{ base: "column", sm: "row" }}
                align={{ base: "start", sm: "center" }}
                justify="space-between"
                gap="4"
              >
                <Flex align="center" gap="4">
                  <Flex
                    w="12"
                    h="12"
                    bg="cyan.50"
                    _dark={{ bg: "cyan.950" }}
                    rounded="xl"
                    align="center"
                    justify="center"
                    flexShrink={0}
                  >
                    <Icon color="cyan.600" _dark={{ color: "cyan.400" }} boxSize="6">
                      <LuFileText />
                    </Icon>
                  </Flex>
                  <Box>
                    <Heading as="h3" fontSize="lg" fontWeight="bold" color={{ base: "gray.900", _dark: "white" }} mb="1">
                      Name Tag Confirmation
                    </Heading>
                    <Text fontSize="sm" color={{ base: "gray.500", _dark: "gray.400" }}>
                      Confirm your name tag details for the upcoming conference
                    </Text>
                  </Box>
                </Flex>
                <Button
                  colorPalette="cyan"
                  onClick={() => setIsOpen(true)}
                  disabled
                  flexShrink={0}
                >
                  <LuLock size={16} />
                  Closed
                </Button>
              </Flex>
            </Box>

            {/* Placeholder for future forms */}
            <Flex
              p="6"
              bg={{ base: "gray.100", _dark: "gray.800" }}
              rounded="2xl"
              borderWidth="1px"
              borderColor={{ base: "gray.200", _dark: "gray.700" }}
              borderStyle="dashed"
              align="center"
              justify="center"
              minH="120px"
            >
              <Text color={{ base: "gray.500", _dark: "gray.400" }} fontSize="sm" fontWeight="medium">
                More forms will be available here as needed
              </Text>
            </Flex>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
