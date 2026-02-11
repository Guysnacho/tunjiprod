"use client";

import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { useUserStore } from "@/lib/store/userStore";
import useStore from "@/lib/store/useStore";
import { createClient } from "@/lib/supabase/client";
import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  Flex,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Menu as MenuIcon, X } from "lucide-react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import AuthListener from "./AuthListener";
import { AuthModal } from "./AuthModal";
import { ColorModeButton } from "@/components/ui/color-mode";

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Membership",
    href: "/membership",
  },
  {
    label: "Forms",
    href: "/forms",
  },
];

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const client = createClient();
  const router = useRouter();
  const path = usePathname();
  const store = useStore(useUserStore, (store) => store);

  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogout = () => {
    client.auth.signOut({ scope: "global" }).finally(() => {
      store?.setId();
      router.push("/");
    });
  };

  const handleOpen = (isSignUp: boolean) => {
    setIsSignUp(isSignUp);
    if (store?.id) {
      router.push("/dashboard");
    } else {
      setAuthOpen(true);
    }
  };

  const isActive = (href?: string) => {
    if (!href || !path) return false;
    if (href === "/") return path === "/";
    return path.startsWith(href);
  };

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={1000}
      bg="white"
      _dark={{ bg: "gray.900" }}
    >
      <AuthListener />
      <AuthModal
        isSignUp={isSignUp}
        isOpen={isAuthOpen}
        setIsOpen={setAuthOpen}
        setIsSignUp={setIsSignUp}
      />

      {/* Main Nav Bar */}
      <Container maxW="7xl">
        <Flex minH="70px" py={3} align="center" justify="space-between">
          {/* Logo */}
          <Link
            asChild
            fontFamily="heading"
            fontWeight={700}
            fontSize="xl"
            color="gray.900"
            _dark={{ color: "white" }}
            _hover={{ textDecoration: "none" }}
          >
            <NextLink href="/">
              <Flex align="center" gap={2}>
                <Text
                  fontSize="lg"
                  fontWeight={800}
                  letterSpacing="tight"
                  color="cyan.600"
                  _dark={{ color: "cyan.400" }}
                >
                  The Soapbox
                </Text>
              </Flex>
            </NextLink>
          </Link>

          {/* Desktop Navigation */}
          <Flex display={{ base: "none", lg: "flex" }} align="center" gap={1}>
            {NAV_ITEMS.map((navItem) => (
              <Box key={navItem.label}>
                <Link asChild>
                  <NextLink href={navItem.href ?? "#"}>
                    <Button
                      variant="ghost"
                      size="sm"
                      fontWeight={isActive(navItem.href) ? 600 : 500}
                      color={isActive(navItem.href) ? "cyan.600" : "gray.700"}
                      _dark={{
                        color: isActive(navItem.href)
                          ? "cyan.400"
                          : "gray.200",
                      }}
                      _hover={{ bg: "gray.100", _dark: { bg: "gray.800" } }}
                    >
                      {navItem.label}
                    </Button>
                  </NextLink>
                </Link>
              </Box>
            ))}

            {/* Color Mode Toggle */}
            <ColorModeButton ml={2} />

            {/* User Menu */}
            {store && store.id ? (
              <MenuRoot>
                <MenuTrigger asChild>
                  <Button
                    ml={2}
                    rounded="full"
                    variant="ghost"
                    cursor="pointer"
                    minW={0}
                  >
                    <Avatar.Root size="sm">
                      <Avatar.Image src="https://api.dicebear.com/9.x/thumbs/png?seed=Lily&size=75" />
                      <Avatar.Fallback>U</Avatar.Fallback>
                    </Avatar.Root>
                  </Button>
                </MenuTrigger>
                <MenuContent>
                  <MenuItem value="dashboard" asChild>
                    <NextLink href="/dashboard">Dashboard</NextLink>
                  </MenuItem>
                  <MenuItem
                    value="logout"
                    onClick={handleLogout}
                    _hover={{ textDecoration: "underline" }}
                  >
                    Log Out
                  </MenuItem>
                </MenuContent>
              </MenuRoot>
            ) : (
              <Flex>
                <Button
                  ml={4}
                  size="sm"
                  bg="cyan.500"
                  color="gray.950"
                  fontWeight={600}
                  _hover={{ bg: "cyan.400" }}
                  onClick={() => handleOpen(false)}
                >
                  Sign In
                </Button>
                <Button
                  ml={4}
                  size="sm"
                  bg="cyan.500"
                  color="gray.950"
                  fontWeight={600}
                  _hover={{ bg: "cyan.400" }}
                  onClick={() => handleOpen(true)}
                >
                  Sign Up
                </Button>
              </Flex>
            )}
          </Flex>

          {/* Mobile Menu Button */}
          <IconButton
            display={{ base: "flex", lg: "none" }}
            onClick={() => setIsOpen(true)}
            variant="ghost"
            aria-label="Open Navigation"
            color="gray.700"
            _dark={{ color: "gray.200" }}
          >
            <MenuIcon size={24} />
          </IconButton>
        </Flex>
      </Container>

      {/* Mobile Drawer */}
      <Drawer.Root
        open={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        placement="end"
      >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content
            bg="white"
            _dark={{ bg: "gray.900" }}
            maxW="100vw"
            w="full"
          >
            <Drawer.Header
              borderBottomWidth="1px"
              borderColor="gray.200"
              _dark={{ borderColor: "gray.700" }}
            >
              <Flex justify="space-between" align="center" w="full">
                <Text
                  fontSize="lg"
                  fontWeight={800}
                  color="cyan.600"
                  _dark={{ color: "cyan.400" }}
                >
                  The Soapbox
                </Text>
                <Drawer.CloseTrigger asChild>
                  <IconButton
                    variant="ghost"
                    aria-label="Close menu"
                    onClick={() => setIsOpen(false)}
                  >
                    <X size={24} />
                  </IconButton>
                </Drawer.CloseTrigger>
              </Flex>
            </Drawer.Header>
            <Drawer.Body p={0}>
              <Stack gap={0}>
                {NAV_ITEMS.map((navItem) => (
                  <MobileNavItem
                    key={navItem.label}
                    {...navItem}
                    isActive={isActive(navItem.href)}
                    onClose={() => setIsOpen(false)}
                  />
                ))}
              </Stack>

              <Stack p={4} gap={3} mt={4}>
                {/* Color Mode Toggle */}
                <Flex justify="center">
                  <ColorModeButton />
                </Flex>

                {store && store.id ? (
                  <>
                    <Button
                      w="full"
                      size="lg"
                      variant="ghost"
                      onClick={() => {
                        setIsOpen(false);
                        router.push("/dashboard");
                      }}
                    >
                      Dashboard
                    </Button>
                    <Button
                      w="full"
                      size="lg"
                      variant="ghost"
                      color="red.600"
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                    >
                      Log Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      w="full"
                      size="lg"
                      variant="ghost"
                      onClick={() => {
                        setIsOpen(false);
                        handleOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      w="full"
                      size="lg"
                      variant="ghost"
                      onClick={() => {
                        setIsOpen(false);
                        handleOpen(true);
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </Stack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Box>
  );
}

interface MobileNavItemProps extends NavItem {
  isActive: boolean;
  onClose: () => void;
}

const MobileNavItem = ({
  label,
  href,
  isActive,
  onClose,
}: MobileNavItemProps) => {
  const router = useRouter();

  return (
    <Flex
      as="button"
      w="full"
      px={6}
      py={4}
      justify="flex-start"
      align="center"
      bg={isActive ? "cyan.50" : "transparent"}
      _dark={{
        bg: isActive ? "cyan.950" : "transparent",
        borderColor: "gray.800",
      }}
      _hover={{ bg: "gray.50", _dark: { bg: "gray.800" } }}
      onClick={() => {
        onClose();
        if (href) router.push(href);
      }}
      borderBottomWidth="1px"
      borderColor="gray.100"
    >
      <Text
        fontWeight={600}
        fontSize="md"
        textTransform="uppercase"
        letterSpacing="wide"
        color={isActive ? "cyan.600" : "gray.800"}
        _dark={{ color: isActive ? "cyan.400" : "gray.100" }}
      >
        {label}
      </Text>
    </Flex>
  );
};
