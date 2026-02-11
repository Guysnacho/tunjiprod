"use client";

import { Field } from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import { toaster } from "@/components/ui/toaster";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/lib/supabase/types";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { SupabaseClient } from "@supabase/supabase-js";
import { Eye, EyeOff } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { LuKeyRound, LuShieldCheck } from "react-icons/lu";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = use(searchParams);
  const router = useRouter();
  const client = createClient();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [valid, setValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  async function verifyResetSession(client: SupabaseClient<Database>) {
    const { error } = await client.auth.verifyOtp({
      type: "recovery",
      token_hash: params.tokenHash as string,
    });

    if (error) {
      toaster.error({
        title: "Ran into an issue verifying your email session",
        description: error.message,
      });
      return;
    } else {
      setValid(true);
    }
  }

  async function handleUpdate(client: SupabaseClient<Database>) {
    setLoading(true);
    const { error } = await client.auth.updateUser({
      password,
    });

    if (error) {
      toaster.error({
        title: "Ran into an issue updating your password",
        description:
          "If an issue persists, please reach out to team@tunjiproductions.com - " +
          error.message,
      });
      setLoading(false);
    } else {
      toaster.success({
        title: "Your request has been recieved",
        description: "Feel free to login using your new credentials!",
      });
      router.replace("/membership?reset=true");
    }
  }

  useEffect(() => {
    if (params.tokenHash && params.email && params.token) {
      verifyResetSession(client).finally(() => setLoading(false));
    } else setLoading(false);

    return () => {
      client.auth.signOut({
        scope: "global",
      });
    };
  }, [router]);

  const passwordsMatch = password === confirm;
  const passwordValid = password.length >= 6;

  return (
    <>
      <Head>
        <title>MCBIOS Account Recovery</title>
        <meta content="MCBIOS Membership Recovery | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>

      {/* Hero Section */}
      <Box as="section" pt="40" pb="16" bg="slate.50">
        <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="center"
            gap={{ base: 8, lg: 16 }}
          >
            {/* Left - Illustration */}
            <Box
              flex="1"
              maxW={{ base: "300px", lg: "400px" }}
              order={{ base: 2, lg: 1 }}
            >
              <Image
                src="https://blush.design/api/download?shareUri=zp2x6bt35MyJr384&c=Hair_0%7Ef3ddb4-0.0.2%7E765227-0.0.3%7E765227-0.0.4%7Eee4e2f-0.0.5%7E8ae0d3_Skin_0%7Ea15122-0.0.2%7Effd4aa-0.0.3%7Edb8c5c-0.0.4%7Effc280-0.0.5%7Edb8c5c&bg=ffffff&w=800&h=800&fm=png"
                alt="People collaborating"
                w="100%"
                h="auto"
              />
            </Box>

            {/* Right - Content */}
            <Box flex="1" order={{ base: 1, lg: 2 }}>
              <Flex align="center" gap="3" mb="4">
                <Flex
                  p="3"
                  bg="red.100"
                  rounded="xl"
                  align="center"
                  justify="center"
                >
                  <Icon color="red.700" boxSize="6">
                    <LuKeyRound />
                  </Icon>
                </Flex>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="widest"
                  color="red.700"
                >
                  Account Recovery
                </Text>
              </Flex>
              <Heading
                as="h1"
                fontSize={{ base: "4xl", md: "5xl" }}
                fontWeight="black"
                color="slate.900"
                mb="4"
                lineHeight="tight"
              >
                Reset Your Password
              </Heading>
              <Text fontSize="lg" color="slate.600" lineHeight="relaxed">
                Enter a new password below to regain access to your MCBIOS
                account and continue engaging with our bioinformatics community.
              </Text>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Form Section */}
      <Box as="section" py="16" bg="white">
        <Container maxW="xl" px={{ base: 4, sm: 6 }}>
          {loading ? (
            <Flex justify="center" align="center" minH="200px">
              <Spinner size="xl" color="red.700" />
            </Flex>
          ) : valid ? (
            <Box
              as="form"
              bg="white"
              p={{ base: 6, md: 10 }}
              rounded="3xl"
              shadow="xl"
              borderWidth="1px"
              borderColor="slate.200"
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                handleUpdate(client);
              }}
            >
              <Stack gap="6">
                <Field label="New Password" required>
                  <InputGroup
                    w="100%"
                    endElement={
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <Eye size={18} />
                        ) : (
                          <EyeOff size={18} />
                        )}
                      </Button>
                    }
                  >
                    <Input
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      onChange={(e) => setPassword(e.currentTarget.value)}
                      value={password}
                      placeholder="Enter your new password"
                      size="lg"
                    />
                  </InputGroup>
                  {password && !passwordValid && (
                    <Text fontSize="sm" color="orange.600" mt="1">
                      Password must be at least 6 characters
                    </Text>
                  )}
                </Field>

                <Field label="Confirm Password" required>
                  <Input
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    onChange={(e) => setConfirm(e.currentTarget.value)}
                    value={confirm}
                    placeholder="Confirm your new password"
                    size="lg"
                  />
                  {confirm && !passwordsMatch && (
                    <Text fontSize="sm" color="orange.600" mt="1">
                      Passwords do not match
                    </Text>
                  )}
                </Field>

                <Button
                  type="submit"
                  size="lg"
                  bg="red.700"
                  color="white"
                  fontWeight="bold"
                  _hover={{ bg: "red.800" }}
                  disabled={loading || !passwordsMatch || !passwordValid}
                  mt="4"
                >
                  Update Password
                </Button>

                <Flex
                  bg="emerald.50"
                  p="4"
                  rounded="xl"
                  borderWidth="1px"
                  borderColor="emerald.200"
                  align="center"
                  gap="3"
                >
                  <Icon color="emerald.600" boxSize="5">
                    <LuShieldCheck />
                  </Icon>
                  <Text fontSize="sm" color="emerald.800">
                    Your password is securely encrypted and never stored in
                    plain text.
                  </Text>
                </Flex>
              </Stack>
            </Box>
          ) : (
            <Box
              bg="orange.50"
              p="8"
              rounded="2xl"
              borderWidth="1px"
              borderColor="orange.200"
              textAlign="center"
            >
              <Heading as="h3" fontSize="xl" color="orange.800" mb="3">
                Invalid or Expired Link
              </Heading>
              <Text color="orange.700" mb="6">
                This password reset link is no longer valid. Please request a
                new one.
              </Text>
              <Button
                colorPalette="orange"
                onClick={() => router.push("/membership")}
              >
                Return to Membership
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}
