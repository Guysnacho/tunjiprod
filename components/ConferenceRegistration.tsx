"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  NativeSelect,
  Separator,
  Stack,
  Steps,
  Text,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useState } from "react";
import { PaymentHandler, PaymentHandlerType } from "./dashboard/PaymentHandler";

export const ConferenceRegistration = ({
  registrationPassed,
}: {
  registrationPassed?: boolean;
}) => {
  const [tier, setTier] = useState<PaymentHandlerType>();
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [institution, setInstitution] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  const goToNext = () => setActiveStep((prev) => prev + 1);
  const goToPrevious = () => setActiveStep((prev) => prev - 1);

  // email check
  const isInvalid =
    email === "" ||
    !(email.includes("@") && email.includes(".")) ||
    fname === "" ||
    lname === "" ||
    institution === "";

  return (
    <section>
      {registrationPassed ? (
        <div className="w-3/4 xl:w-1/2 mx-auto space-y-5">
          <Stack align="center" my={5} gap={3}>
            <Heading fontSize="4xl" textAlign="center">
              The Soapbox Conference
            </Heading>
            <Separator />
            <Text color={{ base: "gray.600", _dark: "gray.300" }}>
              Thank you to everyone who contributed to the conference via
              registrations, submissions, volunteering, and everything in
              between. Registration fees include access to all sessions,
              installations, screenings, and 1 year of community membership.
            </Text>
            <Text>The deadline for registration has passed.</Text>
          </Stack>
        </div>
      ) : (
        <div className="w-3/4 xl:w-1/2 mx-auto space-y-5">
          <Stack align="center" my={5} gap={3}>
            <Heading fontSize="4xl" textAlign="center">
              The Soapbox Registration
            </Heading>
            <Separator />
            <Text color={{ base: "gray.600", _dark: "gray.300" }}>
              Register for The Soapbox conference to access all sessions,
              installations, screenings, workshops, and community events.
              Registration includes a one-year community membership with
              on-demand content access and event recordings.
            </Text>
          </Stack>

          <Steps.Root step={activeStep} count={3}>
            <Steps.List>
              <Steps.Item index={0} title="Contact Info" />
              <Steps.Item index={1} title="Registration Tier" />
              <Steps.Item index={2} title="Payment" />
            </Steps.List>
          </Steps.Root>

          {activeStep === 0 && (
            <Box rounded="lg" bg={{ base: "white", _dark: "black" }} p={8}>
              {/* Form fields */}
              <Stack gap={4}>
                <Stack
                  direction={["column", null, "row"]}
                  justify="space-evenly"
                >
                  <Box>
                    <Field label="First Name" required>
                      <Input
                        type="text"
                        inputMode="text"
                        autoComplete="given-name"
                        onChange={(e) => setFname(e.currentTarget.value)}
                        value={fname}
                      />
                    </Field>
                  </Box>
                  <Box>
                    <Field label="Last Name" required>
                      <Input
                        type="text"
                        inputMode="text"
                        autoComplete="family-name"
                        onChange={(e) => setLname(e.currentTarget.value)}
                        value={lname}
                      />
                    </Field>
                  </Box>
                </Stack>
                <Field label="Email address" required>
                  <Input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    value={email}
                  />
                </Field>
                <Field label="Institution / Organization" required>
                  <Input
                    type="text"
                    inputMode="text"
                    onChange={(e) => setInstitution(e.currentTarget.value)}
                    value={institution}
                  />
                </Field>
                <Flex justify="space-around" my={5}>
                  <Button
                    type="submit"
                    onClick={goToNext}
                    colorPalette="green"
                    disabled={isInvalid}
                    className="mx-auto"
                    w="50%"
                  >
                    Next
                  </Button>
                </Flex>
              </Stack>
            </Box>
          )}

          {activeStep === 1 && (
            <>
              <Flex mx="auto" w={[null, "sm", "lg"]}>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    placeholder="Select a registration level"
                    onChange={(e) => {
                      setTier(e.currentTarget.value as PaymentHandlerType);
                    }}
                  >
                    <option value="student">
                      Conference + Membership | Observer
                    </option>
                    <option value="postdoctorial">
                      Conference + Membership | Creator
                    </option>
                    <option value="professional">
                      Conference + Membership | Visionary
                    </option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Flex>
              <Flex justify="center" gap={2} my={5}>
                <Button onClick={goToPrevious}>Back</Button>
                <Button
                  type="submit"
                  onClick={goToNext}
                  colorPalette="green"
                  disabled={tier === undefined}
                >
                  Next
                </Button>
              </Flex>
            </>
          )}

          {tier && activeStep === 2 && (
            <>
              <PaymentHandler
                tier={tier!}
                email={email!}
                fname={fname!}
                lname={lname!}
                institution={institution!}
              />
              <Flex justify="space-around" my={5}>
                <Button
                  onClick={() => {
                    goToPrevious();
                    setTier(undefined);
                  }}
                  className="mx-auto"
                  w="50%"
                >
                  Back
                </Button>
              </Flex>
            </>
          )}
        </div>
      )}
    </section>
  );
};
