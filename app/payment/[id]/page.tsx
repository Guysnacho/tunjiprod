import {
  Alert,
  Box,
  Button,
  Center,
  Container,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Stripe from "stripe";

export const metadata: Metadata = {
  title: "Payment Confirmation | The Soapbox",
  description: "The Soapbox payment confirmation.",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch customer session
  const { customer_email, status } = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
    {
      method: "GET",
      headers: {
        session_id: id,
      },
    },
  ).then(async (res) => {
    return (await res.json()) as {
      status: Stripe.Checkout.Session.Status;
      customer_email: Stripe.Checkout.Session.CustomerDetails["email"];
    };
  });

  const isComplete = status === "complete";

  return (
    <Container maxW="lg" py={10}>
      <Center>
        <Stack gap={6} textAlign="center">
          {/* Title */}
          <Heading
            size="lg"
            color={{ base: "gray.900", _dark: "white" }}
          >
            {isComplete ? "Payment Confirmed" : "Payment Issue"}
          </Heading>

          <Text
            fontSize="sm"
            color="cyan.600"
            _dark={{ color: "cyan.400" }}
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="widest"
          >
            The Soapbox
          </Text>

          {/* Status Message */}
          <Alert.Root
            status={isComplete ? "success" : "error"}
            variant="subtle"
            textAlign="left"
          >
            <Alert.Description>
              {isComplete ? (
                <>
                  Thank you for your registration! A confirmation
                  email has been sent to{" "}
                  <Text as="span" fontWeight="medium">
                    {customer_email
                      ? customer_email + "."
                      : "the provided email."}
                  </Text>
                </>
              ) : (
                <>
                  Something went wrong while verifying your payment. Please
                  confirm your transaction history and allow some time before
                  attempting another purchase.
                </>
              )}
            </Alert.Description>
          </Alert.Root>

          {/* Navigation */}
          <Link href="/" asChild>
            <Button mx="auto" colorPalette="teal" variant="solid" gap={2}>
              <ChevronLeft size={18} />
              Home
            </Button>
          </Link>

          {/* Support */}
          <Text fontSize="sm">
            If you have any questions, please email{" "}
            <Link
              href="mailto:team@tunjiproductions.com"
              color="blue.600"
              textDecoration="underline"
            >
              team@tunjiproductions.com
            </Link>
            .
          </Text>
        </Stack>
      </Center>
    </Container>
  );
}
