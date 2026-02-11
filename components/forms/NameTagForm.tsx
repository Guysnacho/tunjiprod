import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";
import { isPresent } from "@/lib";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  NativeSelect,
  Stack,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { PaymentBody, PaymentHandlerType } from "../dashboard/PaymentHandler";

export const NameTagForm = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [institution, setInstitution] = useState("");
  const [tier, setTier] = useState<PaymentHandlerType>();
  const [error, setError] = useState("");
  const isValid =
    isPresent(email) &&
    isPresent(fname) &&
    isPresent(lname) &&
    isPresent(institution) &&
    isPresent(tier);

  const handleClose = () => {
    setEmail("");
    setFname("");
    setLname("");
    setInstitution("");
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    if (isPresent(email) && isPresent(institution)) {
      const res = await fetch("/checkout", {
        method: "PUT",
        body: JSON.stringify({
          email,
          institution,
          fname,
          lname,
          tier,
        } satisfies PaymentBody),
      });

      // Handle response
      if (!res.ok) {
        throw new Error(await res.json());
      } else {
        setIsOpen(false);
        toaster.success({
          duration: 6000,
          description: "Thank you for your submission",
        });
      }
    } else {
      setEmail("");
      setError("Invalid email or password provided");
    }
    setLoading(false);
  };

  return (
    <DialogRoot
      size="lg"
      open={isOpen}
      onOpenChange={(e) => !e.open && handleClose()}
    >
      <DialogContent>
        <DialogHeader className="flex flex-col gap-1 text-xl" />
        <DialogCloseTrigger />
        <DialogBody gap={3}>
          <Box rounded="lg" bg={{ base: "white", _dark: "gray.800" }} p={8}>
            <Stack align="center" mb={5}>
              <Heading fontSize="2xl" textAlign="center">
                Name Tag Details
              </Heading>
            </Stack>

            {/* Form fields */}
            <Stack gap={4}>
              {error ? (
                <blockquote className="blockquote text-orange-800">
                  {error}
                </blockquote>
              ) : undefined}
              <HStack>
                <Box>
                  <Field label="First Name" required disabled={loading}>
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
                  <Field label="Last Name" disabled={loading}>
                    <Input
                      type="text"
                      inputMode="text"
                      autoComplete="family-name"
                      onChange={(e) => setLname(e.currentTarget.value)}
                      value={lname}
                    />
                  </Field>
                </Box>
              </HStack>
              <Field label="Institution" required disabled={loading}>
                <Input
                  type="text"
                  inputMode="text"
                  onChange={(e) => setInstitution(e.currentTarget.value)}
                  value={institution}
                />
              </Field>
              <Field
                label={
                  <>
                    Email address
                    <span className="opacity-75">
                      <br />
                      Provide the email you&apos;ve registered with
                    </span>
                  </>
                }
                required
                disabled={loading}
              >
                <Input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  value={email}
                />
              </Field>
              <Flex mx="auto">
                <Field label="Registration Level" required disabled={loading}>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      placeholder="Select your registration level"
                      onChange={(e) => {
                        setTier(e.currentTarget.value as PaymentHandlerType);
                      }}
                    >
                      <option value="student">Student</option>
                      <option value="postdoctorial">Postdoctorial</option>
                      <option value="professional">Professional</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field>
              </Flex>
            </Stack>
          </Box>
        </DialogBody>

        <DialogFooter>
          <Button onClick={handleClose} disabled={loading} className="mr-3">
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() =>
              handleSubmit()
                .catch((error) => setError(error.message))
                .finally(() => setLoading(false))
            }
            colorPalette="green"
            disabled={loading || !isValid}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
