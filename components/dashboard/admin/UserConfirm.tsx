import { User } from "@/components/User";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";
import { Tooltip } from "@/components/ui/tooltip";
import { Database } from "@/lib/supabase/types";
import { registrationFetcher } from "@/lib/swrFetchers";
import {
  Badge,
  Button,
  Input,
  NativeSelect,
  Spinner,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { SupabaseClient } from "@supabase/supabase-js";
import { Check, Trash2 } from "lucide-react";
import {
  Dispatch,
  Key,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import DatePicker from "react-datepicker";
import useSWR, { mutate } from "swr";

import "react-datepicker/dist/react-datepicker.css";

export const tiers = [
  { key: "student", label: "Student" },
  { key: "postdoctorial", label: "Postdoctorial" },
  { key: "professional", label: "Professional" },
  { key: "admin", label: "Admin" },
];

const columns = [
  { name: "REQUEST ID" },
  { name: "MEMBER" },
  { name: "ACTIONS" },
];

type UserRequest = {
  id: number;
  user_id: string;
  fees_paid_at: string | null;
  fname: string | null;
  lname: string | null;
  role: Database["public"]["Enums"]["user_role"];
};

export const UserConfirm = ({
  client,
}: {
  client: SupabaseClient<Database>;
}) => {
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserRequest[]>([]);

  useEffect(() => {
    setLoading(true);
    client
      .from("confirm_request")
      .select(`id, user_id, ...member(*)`)
      .then(({ data, error, statusText }) => {
        if (error) {
          toaster.error({
            title: "Something went wrong collecting confirmation requests",
            description: statusText,
            duration: 5000,
          });
          console.error(error);
        } else {
          // @ts-expect-error dw bout it
          setUsers(data);
        }
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(true);
    if (id === "") {
      client
        .from("confirm_request")
        .select(`id, user_id, ...member(*)`)
        .then(({ data, error, statusText }) => {
          if (error) {
            toaster.error({
              title: "Something went wrong collecting user info",
              description: statusText,
              duration: 5000,
            });
            console.error(error);
          } else {
            // @ts-expect-error dw bout it
            setUsers(data);
          }
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const renderCell = useCallback((user: UserRequest, columnKey: Key) => {
    // @ts-expect-error Type mismatch because inputs are goofy
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "member":
        return <User fname={user.fname} lname={user.lname} role={user.role} />;
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Confirm">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Check
                  color="green"
                  onClick={() => {
                    setId(user.user_id);
                    setOpen(true);
                  }}
                />
              </span>
            </Tooltip>
            <Tooltip content="Delete">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Trash2
                  color="red"
                  onClick={() => {
                    setId(user.user_id);
                    setDeleteOpen(true);
                  }}
                />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div>
      <RetroactiveRegistration />
      <ConfirmModal
        client={client}
        id={id}
        open={open}
        setId={setId}
        setOpen={setOpen}
      />
      <DeleteModal
        client={client}
        id={id}
        open={deleteOpen}
        setId={setId}
        setOpen={setDeleteOpen}
      />
      <div className="flex flex-col gap-5 mx-auto mt-8">
        <Table.ScrollArea maxH="lg" overflowY="auto">
          <Table.Root variant="outline" striped>
            <Table.Caption>
              {users.length
                ? users.length + " members pending admin confirmation"
                : "No users pending admin confirmation"}
            </Table.Caption>
            <Table.Header>
              <Table.Row>
                {columns.map(({ name }) => (
                  <Table.ColumnHeader key={name}>{name}</Table.ColumnHeader>
                ))}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {users.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell>{renderCell(user, "id")}</Table.Cell>
                  <Table.Cell>{renderCell(user, "member")}</Table.Cell>
                  <Table.Cell>{renderCell(user, "actions")}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </div>
    </div>
  );
};

function saveRegistration(session_id: string) {
  return fetch(`${process.env.NEXT_PUBLIC_APP_URL}/checkout`, {
    method: "GET",
    headers: {
      session_id,
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err.message);
      throw err;
    });
}

const RetroactiveRegistration = () => {
  const [sessionId, setSessionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!sessionId.trim()) {
      toaster.create({
        title: "Session ID required",
        description: "Please enter a Stripe session ID",
        type: "warning",
        duration: 4000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await saveRegistration(sessionId.trim());
      if (result.error) {
        toaster.error({
          title: "Registration failed",
          description: result.error,
          duration: 6000,
        });
      } else {
        toaster.success({
          title: "Registration confirmed",
          description: "User registration has been processed successfully",
          duration: 5000,
        });
        setSessionId("");
      }
    } catch (err) {
      toaster.error({
        title: "Something went wrong",
        description:
          err instanceof Error ? err.message : "Failed to process registration",
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-8 p-4 max-w-md border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Retroactive Registration</h3>
      <p className="text-sm text-gray-600 mb-4">
        Use this to confirm user registrations retroactively if there was a
        service or database outage. Pressing submit will fetch the transaction
        and re-save the user's form fields.
      </p>
      <Field label="Stripe Session ID">
        <div className="flex gap-2">
          <Input
            placeholder="cs_live_..."
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            disabled={isSubmitting}
          />
          <Button
            colorPalette="blue"
            onClick={handleSubmit}
            loading={isSubmitting}
            loadingText="Processing"
          >
            Submit
          </Button>
        </div>
      </Field>
    </div>
  );
};

const ConfirmModal = ({
  client,
  id,
  open,
  setOpen,
  setId,
}: {
  client: SupabaseClient<Database>;
  id: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setId: Dispatch<SetStateAction<string>>;
}) => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [role, setRole] = useState<
    "student" | "postdoctorial" | "professional" | "admin" | undefined
  >();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [step, setStep] = useState<"confirm" | "cleanup">("confirm");
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { data: rawRegistrations } = useSWR(
    open && step === "cleanup" ? "/admin/registration/raw" : null,
    () => registrationFetcher(client),
  );

  const handleClose = () => {
    setId("");
    setOpen(false);
    setStep("confirm");
    setSelectedEmail(null);
  };

  const handleUpdate = async (
    uid: string,
    date: Date | null,
    role: "student" | "postdoctorial" | "professional" | "admin",
  ) => {
    setUpdateLoading(true);
    if (!role) {
      setUpdateLoading(false);
      throw Error("Invalid role");
    }

    // Add reference to video in db
    const { data, error } = await client
      .from("member")
      .update({
        role,
        fees_paid_at: date?.toISOString(),
        org_id: process.env.NEXT_PUBLIC_ORG_ID,
      })
      .eq("user_id", uid)
      .select()
      .single();

    const { error: appendError } = await client.rpc(
      "append_current_year_to_attended",
      {
        target_user: uid,
      },
    );

    if (error || appendError) {
      toaster.error({
        duration: 6000,
        description:
          "Something went wrong while we were updating this user's membership - " +
          (error || appendError)!.message,
      });
      console.error(error?.message ?? appendError?.message);
    } else {
      toaster.success({
        duration: 6000,
        title: "Mission Accomplished",
        description: `Successfully updated membership for ${
          data.fname + " " + data.lname
        } with the following role: ${data.role}`,
      });
    }
  };

  const handleDeleteRawRegistration = async () => {
    if (!selectedEmail) return;
    setDeleteLoading(true);

    const { error } = await client
      .from("raw_registration")
      .delete()
      .eq("email", selectedEmail)
      .eq("org_id", process.env.NEXT_PUBLIC_ORG_ID!);

    if (error) {
      toaster.error({
        duration: 6000,
        description:
          "Something went wrong while deleting the unauthenticated registration - " +
          error.message,
      });
      console.error(error);
    } else {
      toaster.success({
        duration: 6000,
        title: "Registration Removed",
        description: `Deleted unauthenticated registration for ${selectedEmail}`,
      });
      mutate("/admin/registration/raw");
    }
    setDeleteLoading(false);
    handleClose();
  };

  return (
    <DialogRoot open={open} onOpenChange={(e) => !e.open && handleClose()}>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-1">
          <DialogTitle>
            {step === "confirm"
              ? "Confirm User Properties"
              : "Clean Up Unauthenticated Registration"}
          </DialogTitle>
        </DialogHeader>
        <DialogCloseTrigger />

        {step === "confirm" && (
          <>
            <DialogBody>
              <NativeSelect.Root>
                <NativeSelect.Field
                  onChange={(e) => {
                    // @ts-expect-error Type mismatch because inputs are nullable
                    setRole(e.target.value || undefined);
                  }}
                  placeholder="Select a Membership"
                >
                  {tiers.map((tier) => (
                    <option key={tier.key} value={tier.label.toLowerCase()}>
                      {tier.label}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              <DatePicker
                aria-label="Paid On"
                className="mt-4"
                selected={date}
                maxDate={new Date()}
                onChange={setDate}
              />
            </DialogBody>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                colorPalette="green"
                variant={
                  role === undefined || date === undefined ? "ghost" : "solid"
                }
                disabled={role === undefined || date === undefined}
                onClick={() =>
                  handleUpdate(id, date, role!)
                    .then(() => {
                      setStep("cleanup");
                    })
                    .finally(() => setUpdateLoading(false))
                }
              >
                {updateLoading ? <Spinner /> : "Submit"}
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "cleanup" && (
          <>
            <DialogBody>
              <Stack gap="3">
                <Text
                  fontSize="sm"
                  color={{ base: "gray.600", _dark: "gray.300" }}
                >
                  Would you like to remove a unauthenticated registration entry for this
                  user? This is optional.
                </Text>

                {!rawRegistrations?.length ? (
                  <Text
                    fontSize="sm"
                    color={{ base: "gray.400", _dark: "gray.500" }}
                  >
                    No unauthenticated registrations found.
                  </Text>
                ) : (
                  <Table.ScrollArea maxH="xs" overflowY="auto">
                    <Table.Root size="sm" variant="outline">
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeader>Name</Table.ColumnHeader>
                          <Table.ColumnHeader>Email</Table.ColumnHeader>
                          <Table.ColumnHeader>Role</Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {rawRegistrations.map((reg) => (
                          <Table.Row
                            key={reg.email}
                            cursor="pointer"
                            onClick={() => setSelectedEmail(reg.email)}
                            bg={
                              selectedEmail === reg.email
                                ? { base: "blue.100", _dark: "blue.900" }
                                : undefined
                            }
                            borderLeft={
                              selectedEmail === reg.email
                                ? "3px solid"
                                : "3px solid transparent"
                            }
                            borderLeftColor={
                              selectedEmail === reg.email
                                ? { base: "blue.500", _dark: "blue.400" }
                                : "transparent"
                            }
                            _hover={{
                              bg: {
                                base:
                                  selectedEmail === reg.email
                                    ? "blue.100"
                                    : "gray.100",
                                _dark:
                                  selectedEmail === reg.email
                                    ? "blue.900"
                                    : "gray.700",
                              },
                            }}
                          >
                            <Table.Cell>
                              <Text fontSize="sm">
                                {reg.fname} {reg.lname}
                              </Text>
                            </Table.Cell>
                            <Table.Cell>
                              <Text
                                fontSize="xs"
                                color={{ base: "gray.500", _dark: "gray.400" }}
                              >
                                {reg.email}
                              </Text>
                            </Table.Cell>
                            <Table.Cell>
                              <Badge size="sm">{reg.role}</Badge>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  </Table.ScrollArea>
                )}
              </Stack>
            </DialogBody>
            <DialogFooter>
              <Button variant="ghost" onClick={handleClose}>
                Skip
              </Button>
              <Button
                colorPalette="red"
                disabled={!selectedEmail}
                variant={!selectedEmail ? "ghost" : "solid"}
                onClick={handleDeleteRawRegistration}
              >
                {deleteLoading ? <Spinner /> : "Delete Selected"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </DialogRoot>
  );
};

const DeleteModal = ({
  client,
  id,
  open,
  setOpen,
  setId,
}: {
  client: SupabaseClient<Database>;
  id: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setId: Dispatch<SetStateAction<string>>;
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleClose = () => {
    setId("");
    setOpen(false);
  };

  const handleDelete = async (uid: string) => {
    setDeleteLoading(true);

    const { error } = await client
      .from("confirm_request")
      .delete()
      .eq("user_id", uid);

    if (error) {
      toaster.error({
        duration: 6000,
        description:
          "Something went wrong while deleting the confirmation request - " +
          error.message,
      });
      console.error(error);
    } else {
      toaster.success({
        duration: 6000,
        title: "Request Deleted",
        description: "Successfully deleted the confirmation request",
      });
    }
  };

  return (
    <DialogRoot open={open} onOpenChange={(e) => !e.open && handleClose()}>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-1">
          <DialogTitle>Delete Confirmation Request</DialogTitle>
        </DialogHeader>
        <DialogCloseTrigger />
        <DialogBody>
          <p>
            Are you sure you want to delete this confirmation request? This
            action cannot be undone.
          </p>
        </DialogBody>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            colorPalette="red"
            onClick={() =>
              handleDelete(id)
                .then(() => {
                  setId("");
                  setOpen(false);
                })
                .finally(() => setDeleteLoading(false))
            }
          >
            {deleteLoading ? <Spinner /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default UserConfirm;
