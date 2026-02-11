"use client";

import { AdminPanel } from "@/components/dashboard/admin/AdminPanel";
import { MemberContent } from "@/components/dashboard/admin/MemberContent";
import {
  PaymentHandler,
  PaymentHandlerType,
} from "@/components/dashboard/PaymentHandler";
import { toaster } from "@/components/ui/toaster";
import { Avatar } from "@/components/ui/avatar";
import {
  DrawerRoot,
  DrawerContent,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { authFetcher, DUPLICATE_ROW } from "@/lib";
import { useUserStore, UserStore } from "@/lib/store/userStore";
import useStore from "@/lib/store/useStore";
import { createClient } from "@/lib/supabase/client";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  NativeSelect,
  Stack,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import {
  ChevronLeft,
  Menu,
  Shield,
  User,
  Video,
} from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

type DashboardSection = "admin" | "content" | "profile";

function deriveRole(role: string | undefined | null) {
  switch (role) {
    case "admin":
      return "Admin";
    case "professional":
      return "Professional";
    case "postdoctorial":
      return "Postdoctorial";
    case "student":
      return "Student";
    default:
      return "Member";
  }
}

function roleBadgeColor(role: string | undefined | null) {
  switch (role) {
    case "admin":
      return "purple";
    case "professional":
      return "blue";
    case "postdoctorial":
      return "teal";
    case "student":
      return "green";
    default:
      return "gray";
  }
}

export default function Page() {
  const client = createClient();
  const store = useStore(useUserStore, (store) => store);
  const [tier, setTier] = useState<PaymentHandlerType>();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data, error } = useSWR("/auth/user", () => authFetcher(client), {
    onSuccess(data) {
      store?.setId(data.user!.user_id);
      store?.setRole(data.user!.role);
    },
  });

  const isAdmin = data?.user?.role === "admin";
  const isPaid = !!data?.user?.fees_paid_at;

  const defaultSection: DashboardSection = isAdmin
    ? "admin"
    : "profile";
  const [activeSection, setActiveSection] =
    useState<DashboardSection>();

  const section = activeSection ?? defaultSection;

  const navItems: {
    key: DashboardSection;
    label: string;
    icon: typeof Shield;
    show: boolean;
  }[] = [
    { key: "admin", label: "Admin", icon: Shield, show: isAdmin },
    {
      key: "content",
      label: "Conference Content",
      icon: Video,
      show: isPaid,
    },
    { key: "profile", label: "Profile", icon: User, show: true },
  ];

  const visibleNavItems = navItems.filter((item) => item.show);

  const handleNavClick = (key: DashboardSection) => {
    setActiveSection(key);
    setDrawerOpen(false);
  };

  const sidebarContent = (
    <Stack gap="6">
      {/* User card */}
      <Box
        p="4"
        rounded="xl"
        bg={{ base: "gray.50", _dark: "gray.800" }}
      >
        <Flex align="center" gap="3">
          <Avatar
            name={
              data?.user
                ? `${data.user.fname} ${data.user.lname}`
                : undefined
            }
            src="https://api.dicebear.com/9.x/thumbs/png?seed=Lily&size=75"
            size="lg"
          />
          <Box overflow="hidden">
            <Text
              fontWeight="bold"
              fontSize="sm"
              color={{ base: "gray.900", _dark: "white" }}
              truncate
            >
              {data?.user
                ? `${data.user.fname} ${data.user.lname}`
                : "Loading..."}
            </Text>
            {data?.user && (
              <Badge
                colorPalette={roleBadgeColor(data.user.role)}
                size="sm"
                mt="1"
              >
                {deriveRole(data.user.role)}
              </Badge>
            )}
          </Box>
        </Flex>
      </Box>

      {/* Navigation */}
      <Stack gap="1">
        {visibleNavItems.map((item) => {
          const isActive = section === item.key;
          return (
            <Box
              as="button"
              key={item.key}
              onClick={() => handleNavClick(item.key)}
              display="flex"
              alignItems="center"
              gap="3"
              w="full"
              px="3"
              py="2.5"
              rounded="lg"
              fontSize="sm"
              fontWeight="medium"
              transition="all 0.15s"
              bg={
                isActive
                  ? { base: "cyan.50", _dark: "cyan.950" }
                  : "transparent"
              }
              color={
                isActive
                  ? { base: "cyan.700", _dark: "cyan.300" }
                  : { base: "gray.600", _dark: "gray.400" }
              }
              _hover={
                isActive
                  ? undefined
                  : { bg: { base: "gray.100", _dark: "gray.800" } }
              }
              textAlign="left"
            >
              <Icon boxSize="5">
                <item.icon />
              </Icon>
              {item.label}
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );

  return (
    <>
      <Head>
        <title>Dashboard | The Soapbox</title>
        <meta content="Dashboard | The Soapbox" />
      </Head>

      <Container maxW="7xl" py="6" px={{ base: "4", lg: "8" }}>
        {error && (
          <Flex justify="center" py="8">
            <Box textAlign="center" maxW="md">
              <Heading
                as="h5"
                fontSize="lg"
                fontWeight="semibold"
                color={{ base: "gray.900", _dark: "white" }}
                mb="4"
              >
                We ran into an issue
              </Heading>
              <Text color={{ base: "gray.600", _dark: "gray.300" }}>
                There was an error fetching your account information. If
                an issue persists, please reach out to{" "}
                <Link
                  href="mailto:team@tunjiproductions.com"
                  color="blue.600"
                  _dark={{ color: "blue.400" }}
                  textDecoration="underline"
                >
                  team@tunjiproductions.com
                </Link>
                .
              </Text>
            </Box>
          </Flex>
        )}

        {!error && (
          <Flex gap="8" display={{ base: "none", lg: "flex" }}>
            {/* Desktop Sidebar */}
            <Box
              w="250px"
              flexShrink={0}
              position="sticky"
              top="24"
              alignSelf="flex-start"
            >
              {sidebarContent}
            </Box>

            {/* Desktop Content */}
            <Box flex="1" minW="0">
              <DashboardContent
                section={section}
                client={client}
                data={data}
                store={store}
                tier={tier}
                setTier={setTier}
              />
            </Box>
          </Flex>
        )}

        {/* Mobile Layout */}
        {!error && (
          <Box display={{ base: "block", lg: "none" }}>
            {/* Mobile header */}
            <Flex align="center" justify="space-between" mb="6">
              <Flex align="center" gap="3">
                <Avatar
                  name={
                    data?.user
                      ? `${data.user.fname} ${data.user.lname}`
                      : undefined
                  }
                  src="https://api.dicebear.com/9.x/thumbs/png?seed=Lily&size=75"
                  size="sm"
                />
                <Box>
                  <Text
                    fontWeight="bold"
                    fontSize="sm"
                    color={{ base: "gray.900", _dark: "white" }}
                  >
                    {data?.user
                      ? `${data.user.fname} ${data.user.lname}`
                      : "Loading..."}
                  </Text>
                  {data?.user && (
                    <Badge
                      colorPalette={roleBadgeColor(data.user.role)}
                      size="sm"
                    >
                      {deriveRole(data.user.role)}
                    </Badge>
                  )}
                </Box>
              </Flex>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open navigation"
              >
                <Icon boxSize="5">
                  <Menu />
                </Icon>
              </Button>
            </Flex>

            {/* Mobile Drawer */}
            <DrawerRoot
              open={drawerOpen}
              onOpenChange={(e) => setDrawerOpen(e.open)}
              placement="start"
            >
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Navigation</DrawerTitle>
                </DrawerHeader>
                <DrawerBody>{sidebarContent}</DrawerBody>
                <DrawerCloseTrigger />
              </DrawerContent>
            </DrawerRoot>

            {/* Mobile Content */}
            <DashboardContent
              section={section}
              client={client}
              data={data}
              store={store}
              tier={tier}
              setTier={setTier}
            />
          </Box>
        )}
      </Container>
    </>
  );
}

function DashboardContent({
  section,
  client,
  data,
  store,
  tier,
  setTier,
}: {
  section: DashboardSection;
  client: ReturnType<typeof createClient>;
  data: Awaited<ReturnType<typeof authFetcher>> | undefined;
  store: UserStore | undefined;
  tier: PaymentHandlerType | undefined;
  setTier: (tier: PaymentHandlerType | undefined) => void;
}) {
  return (
    <>
      {section === "admin" && data?.user?.role === "admin" && (
        <AdminPanel client={client} />
      )}

      {section === "content" && data?.user?.fees_paid_at && (
        <MemberContent videos={data?.videos} />
      )}

      {section === "profile" && (
        <Stack gap="6" py="4">
          {/* Profile Card */}
          <Card.Root
            variant="outline"
            borderColor={{ base: "gray.200", _dark: "gray.700" }}
          >
            <Card.Body>
              <Flex align="center" gap="4">
                <Avatar
                  name={
                    data?.user
                      ? `${data.user.fname} ${data.user.lname}`
                      : undefined
                  }
                  src="https://api.dicebear.com/9.x/thumbs/png?seed=Lily&size=75"
                  size="xl"
                />
                <Box>
                  <Heading
                    fontSize="xl"
                    fontWeight="bold"
                    color={{ base: "gray.900", _dark: "white" }}
                  >
                    {data?.user?.fname} {data?.user?.lname}
                  </Heading>
                  <Text
                    fontSize="sm"
                    color={{ base: "gray.500", _dark: "gray.400" }}
                    mb="2"
                  >
                    {data?.user?.email}
                  </Text>
                  <Badge
                    colorPalette={roleBadgeColor(data?.user?.role)}
                    size="md"
                  >
                    {deriveRole(data?.user?.role)}
                  </Badge>
                </Box>
              </Flex>
            </Card.Body>
          </Card.Root>

          {/* Registration / Payment Section */}
          {(!data?.user || !data?.user?.fees_paid_at) && (
            <Stack gap="6">
              <Card.Root
                variant="outline"
                borderColor={{ base: "gray.200", _dark: "gray.700" }}
              >
                <Card.Header>
                  <Card.Title
                    fontSize="lg"
                    color={{ base: "gray.900", _dark: "white" }}
                  >
                    Welcome to The Soapbox!
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Stack gap="6">
                    <Text
                      color={{ base: "gray.600", _dark: "gray.300" }}
                      lineHeight="relaxed"
                      fontSize="sm"
                    >
                      Complete your registration to unlock full access to
                      conference sessions, installations, screenings, workshops,
                      and community membership. Your registration includes
                      on-demand content access and event recordings.
                    </Text>
                  </Stack>
                </Card.Body>
              </Card.Root>

              {/* Payment Confirmation Card */}
              <Card.Root
                variant="outline"
                borderColor={{ base: "gray.200", _dark: "gray.700" }}
              >
                <Card.Body>
                  <Stack gap="4" textAlign="center">
                    <Text
                      color={{ base: "gray.600", _dark: "gray.300" }}
                      fontSize="sm"
                    >
                      <Text
                        as="span"
                        textDecoration="underline"
                        fontWeight="semibold"
                      >
                        If you have paid the required fees
                      </Text>
                      , notify us here so we can confirm and grant access to
                      everything!
                    </Text>
                    <Button
                      colorPalette="green"
                      onClick={() => {
                        client
                          .from("confirm_request")
                          .insert({
                            user_id: store?.id,
                            org_id: process.env.NEXT_PUBLIC_ORG_ID,
                          })
                          .then(({ error }) => {
                            if (error) {
                              if (error?.code === DUPLICATE_ROW) {
                                toaster.error({
                                  description:
                                    "You've already submitted a confirmation request. We'll update your access as soon as we confirm.",
                                  duration: 6000,
                                });
                              } else {
                                toaster.error({
                                  description:
                                    "Something went wrong while submitting your request - " +
                                    error.message,
                                  duration: 6000,
                                });
                                console.error(error);
                              }
                            } else {
                              toaster.success({
                                description:
                                  "Thank you for letting us know, we'll confirm your status ASAP!",
                                duration: 6000,
                              });
                            }
                          });
                      }}
                    >
                      My fees are paid
                    </Button>
                  </Stack>
                </Card.Body>
              </Card.Root>

              {/* Tier Selection Card */}
              <Card.Root
                variant="outline"
                borderColor={{ base: "gray.200", _dark: "gray.700" }}
              >
                <Card.Header>
                  <Card.Title
                    fontSize="md"
                    color={{ base: "gray.900", _dark: "white" }}
                  >
                    Select Registration Tier
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Flex direction="column" gap="4">
                    {tier ? (
                      <Button
                        variant="outline"
                        onClick={() => setTier(undefined)}
                        alignSelf="flex-start"
                      >
                        <ChevronLeft />
                        Select a different tier
                      </Button>
                    ) : (
                      <NativeSelect.Root>
                        <NativeSelect.Field
                          placeholder="Select a registration level"
                          onChange={(
                            e: React.ChangeEvent<HTMLSelectElement>
                          ) => {
                            setTier(
                              e.currentTarget.value as PaymentHandlerType
                            );
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
                    )}
                    {tier && data?.user ? (
                      <PaymentHandler
                        tier={tier}
                        userId={data.user.user_id}
                        email={data.user.email!}
                      />
                    ) : undefined}
                  </Flex>
                </Card.Body>
              </Card.Root>
            </Stack>
          )}
        </Stack>
      )}
    </>
  );
}
