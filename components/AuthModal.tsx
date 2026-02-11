"use client";

import { useUserStore } from "@/lib/store/userStore";
import useStore from "@/lib/store/useStore";
import { createClient } from "@/lib/supabase/client";
import { Info, Eye, EyeOff } from "lucide-react";
import {
  Box,
  Button,

  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogCloseTrigger,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import { Alert } from "@/components/ui/alert";
import { toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { z } from "zod";

export const AuthModal = ({
  isOpen,
  setIsOpen,
  isSignUp,
  setIsSignUp,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isSignUp?: boolean;
  setIsSignUp: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [institution, setInstitution] = useState("");
  const [error, setError] = useState("");
  const client = createClient();
  const store = useStore(useUserStore, (store) => store);
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setFname("");
    setLname("");
    setInstitution("");
    setIsReset(false);
    setIsOpen(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const { success, error } = SignInSchema.safeParse({
      email,
      password,
    });
    if (success) {
      // Perform auth
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });
      // Handle response
      if (error) {
        throw error;
      } else {
        toaster.success({
          title: "Welcome Back!",
        });
        store?.setId(data.user?.id);
        setIsOpen(false);
        router.push("/dashboard");
      }
    } else {
      setPassword("");
      throw new Error(
        Object.entries(z.treeifyError(error).properties!)
          .map((err) => err[1].errors.join(", "))
          .join(", "),
      );
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError("");

    const { success, error } = SignUpSchema.safeParse({
      email,
      password,
      institution,
      fname,
      lname,
    });
    if (success) {
      // Perform auth
      const { error } = await client.auth.signUp({
        email,
        password,
        options: {
          data: {
            fname,
            lname,
            role: "student",
            institution,
            org_id: process.env.NEXT_PUBLIC_ORG_ID,
          },
        },
      });
      // Handle response
      if (error) {
        throw error;
      } else {
        setIsOpen(false);
        toaster.success({
          title: "Success",
          description: "Please check your email for a confirmation.",
          duration: 6000,
        });
      }
    } else {
      throw new Error(
        Object.entries(z.treeifyError(error).properties!)
          .map((err) => err[1].errors.join(" | "))
          .join(" | "),
      );
    }
    setLoading(false);
  };

  const handleReset = async () => {
    setLoading(true);
    setError("");

    const { success, error } = ResetSchema.safeParse({
      email,
    });
    if (success) {
      // Perform auth
      const { error } = await client.auth.resetPasswordForEmail(email);
      // Handle response
      if (error) {
        if (error.message.toLocaleLowerCase().includes("rate limit")) {
          throw new Error(
            "Too many signup requests recieved for the provided email. Try again later.",
          );
        }
        throw error;
      } else {
        setIsOpen(false);
        toaster.success({
          title: "Success",
          description:
            "If an account is found in our system, you will recieve an email.",
          duration: 6000,
        });
      }
    } else {
      throw new Error(
        Object.entries(z.treeifyError(error).properties!)
          .map((err) => err[1].errors.join(" | "))
          .join(" | "),
      );
    }
    setLoading(false);
  };

  return (
    <DialogRoot
      size="sm"
      open={isOpen}
      onOpenChange={(e) => !e.open && handleClose()}
    >
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (isReset) {
              handleReset()
                .then(() => handleClose())
                .catch((error) => {
                  toaster.error({
                    title: "Ran into an issue resetting your password",
                    description: error.message,
                  });
                  console.error(error);
                })
                .finally(() => setLoading(false));
            } else if (isSignUp) {
              handleSignUp()
                .then(() => handleClose())
                .catch((error) => {
                  toaster.error({
                    title: "Ran into an issue signing up",
                    description: error.message,
                  });
                  console.error(error);
                })
                .finally(() => setLoading(false));
            } else {
              handleLogin()
                .then(() => handleClose())
                .catch((error) => {
                  toaster.error({
                    title: "Ran into an issue logging in",
                    description: error.message,
                  });
                  console.error(error);
                })
                .finally(() => setLoading(false));
            }
          }}
        >
          <DialogHeader className="flex flex-col gap-1 text-xl">
            <DialogTitle>
              {isReset
                ? "Reset your Password"
                : isSignUp
                  ? "Enter The Soapbox"
                  : "Log In"}
            </DialogTitle>
          </DialogHeader>
          <DialogCloseTrigger />
          <DialogBody gap={3}>
            <Stack align="center" mb={5}>
              {isReset ? (
                <>
                  <Heading fontSize="4xl" textAlign="center">
                    Reset your Password
                  </Heading>
                  <Text
                    color={{ base: "gray.600", _dark: "gray.300" }}
                    className="border-l-gray-600 border-l-2 pl-3"
                  >
                    If you&apos;re having trouble logging into your account or
                    have just plain forgotten your password, please enter the
                    email you&apos;ve signed up with.
                  </Text>
                </>
              ) : isSignUp ? (
                <>
                  <Text
                    color={{ base: "gray.600", _dark: "gray.300" }}
                    className="border-l-gray-600 border-l-2 pl-3"
                  >
                    Create an account to register for The Soapbox and unlock
                    features like session recordings and exclusive content. An
                    account is not required to attend, but it enhances your
                    experience.
                  </Text>
                  <Alert
                    borderRadius="xl"
                    icon={<Info />}
                    title="Email Delivery Notice"
                  >
                    Some email providers may delay confirmation emails. If you
                    don&apos;t receive one shortly, check your spam folder or{" "}
                    <Link
                      href="/events"
                      textDecoration="underline"
                      _hover={{ fontWeight: "bold" }}
                    >
                      register for the conference without an account.
                    </Link>
                  </Alert>
                </>
              ) : undefined}
            </Stack>

            {/* Form fields */}
            <Stack gap={4}>
              {error ? (
                <blockquote className="blockquote text-orange-800">
                  {error}
                </blockquote>
              ) : undefined}
              {!isReset && isSignUp && (
                <Stack direction={["column", null, "row"]} justify="center">
                  <Field label="First Name" required disabled={loading}>
                    <Input
                      type="text"
                      inputMode="text"
                      autoComplete="given-name"
                      onChange={(e) => setFname(e.currentTarget.value)}
                      value={fname}
                    />
                  </Field>
                  <Field label="Last Name" required disabled={loading}>
                    <Input
                      type="text"
                      inputMode="text"
                      autoComplete="family-name"
                      onChange={(e) => setLname(e.currentTarget.value)}
                      value={lname}
                    />
                  </Field>
                </Stack>
              )}
              {!isReset && isSignUp && (
                <Box>
                  <Field label="Institution / Organization" required disabled={loading}>
                    <Input
                      type="text"
                      inputMode="text"
                      onChange={(e) => setInstitution(e.currentTarget.value)}
                      value={institution}
                      required
                    />
                  </Field>
                </Box>
              )}
              <Field label="Email Address" required disabled={loading}>
                <Input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  value={email}
                />
              </Field>
              {!isReset && (
                <Field label="Password" required disabled={loading}>
                  <InputGroup
                    w="100%"
                    endElement={
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <Eye /> : <EyeOff />}
                      </Button>
                    }
                  >
                    <Input
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      onChange={(e) => setPassword(e.currentTarget.value)}
                      value={password}
                    />
                  </InputGroup>
                </Field>
              )}
              {!isReset && (
                <Stack pt={6}>
                  <Text textAlign="center">
                    {isSignUp
                      ? "Already a member? "
                      : "Haven't signed up yet? "}
                    <Link
                      color="cyan.400"
                      onClick={() => !loading && setIsSignUp(!isSignUp)}
                      cursor="pointer"
                    >
                      {isSignUp ? "Login" : "Sign Up"}
                    </Link>
                  </Text>
                  <Text textAlign="center">
                    Forgot your password?{" "}
                    <Link
                      color="cyan.400"
                      onClick={() => !loading && setIsReset(true)}
                      cursor="pointer"
                    >
                      Password Reset
                    </Link>
                  </Text>
                </Stack>
              )}
            </Stack>
          </DialogBody>

          <DialogFooter>
            <Button
              onClick={() => {
                if (isReset) {
                  setIsReset(false);
                } else handleClose();
              }}
              disabled={loading}
              className="mr-3"
            >
              Cancel
            </Button>
            {isReset ? (
              <Button type="submit" colorPalette="cyan" disabled={loading}>
                Submit
              </Button>
            ) : isSignUp ? (
              <Button type="submit" colorPalette="cyan" disabled={loading}>
                Sign Up
              </Button>
            ) : (
              <Button type="submit" colorPalette="cyan" disabled={loading}>
                Login
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
};

const SignUpSchema = z.object({
  fname: z
    .string()
    .min(2, {
      error: "Invalid given name, minimum of 2 characters",
    })
    .describe("User's given name // Please provide your given name"),
  lname: z
    .string()
    .min(3, { error: "Invalid given name, minimum of 2 characters" })
    .describe("User's family name // Please provide your family name"),
  institution: z
    .string()
    .min(3, {
      error: "Please provide your affiliated institution",
    })
    .describe("Affiliated institution"),
  email: z
    .email({
      error: "Invalid email",
    })
    .describe("User's email name"),
  password: z
    .string()
    .min(3, {
      error: "Password too short, minimum of 3 characters",
    })
    .describe("User's password"),
});

const SignInSchema = z.object({
  email: z
    .email({
      error: "Invalid email",
    })
    .describe("User's email name"),
  password: z
    .string()
    .min(3, {
      error: "Password too short, minimum of 3 characters",
    })
    .describe("User's password"),
});

const ResetSchema = z.object({
  email: z
    .email({
      error: "Invalid email",
    })
    .describe("User's email name"),
});
