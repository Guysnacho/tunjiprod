"use client";

import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

const footerLinks = {
  conference: {
    title: "Conference",
    links: [
      { label: "Events", href: "/events" },
      { label: "Membership", href: "/membership" },
      { label: "Forms", href: "/forms" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Member Portal", href: "/dashboard" },
      { label: "Late Registration", href: "/late" },
    ],
  },
};

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Guysnacho",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

interface FooterLinkGroupProps {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

const FooterLinkGroup = ({ title, links }: FooterLinkGroupProps) => (
  <Stack gap={3}>
    <Text
      fontSize="xs"
      fontWeight={600}
      textTransform="uppercase"
      letterSpacing="wider"
      color="gray.500"
    >
      {title}
    </Text>
    <Stack gap={2}>
      {links.map((link) => (
        <Link
          key={link.label}
          asChild
          fontSize="sm"
          color="gray.600"
          _dark={{ color: "gray.400" }}
          _hover={{ color: "cyan.600", _dark: { color: "cyan.400" } }}
        >
          {link.external ? (
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ) : (
            <NextLink href={link.href}>{link.label}</NextLink>
          )}
        </Link>
      ))}
    </Stack>
  </Stack>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      as="footer"
      bg="gray.50"
      _dark={{ bg: "gray.900", borderColor: "gray.800" }}
      borderTopWidth="1px"
      borderColor={{ base: "gray.200" }}
    >
      <Container maxW="7xl" py={16}>
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "2fr repeat(2, 1fr)",
          }}
          gap={{ base: 8, lg: 12 }}
        >
          {/* Brand Column */}
          <GridItem colSpan={{ base: 1, sm: 2, lg: 1 }}>
            <Stack gap={4}>
              <Link asChild _hover={{ textDecoration: "none" }}>
                <NextLink href="/">
                  <Text
                    fontSize="xl"
                    fontWeight={800}
                    color="cyan.600"
                    _dark={{ color: "cyan.400" }}
                  >
                    The Soapbox
                  </Text>
                </NextLink>
              </Link>
              <Text
                fontSize="sm"
                color="gray.600"
                _dark={{ color: "gray.400" }}
                maxW="280px"
              >
                A sci-fi themed Music & Art Conference by Tunji Productions.
                Exploring 4D artforms, 5D film, sound design, and immersive
                creative experiences.
              </Text>
              <Flex gap={3} mt={2}>
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    p={2}
                    borderRadius="md"
                    color="gray.500"
                    _hover={{
                      color: "cyan.600",
                      bg: "gray.100",
                      _dark: { color: "cyan.400", bg: "gray.800" },
                    }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </Flex>
            </Stack>
          </GridItem>

          {/* Link Columns */}
          <GridItem>
            <FooterLinkGroup {...footerLinks.conference} />
          </GridItem>
          <GridItem>
            <FooterLinkGroup {...footerLinks.resources} />
          </GridItem>
        </Grid>

        {/* Bottom Bar */}
        <Flex
          mt={12}
          pt={8}
          borderTopWidth="1px"
          borderColor="gray.200"
          _dark={{ borderColor: "gray.800" }}
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "center", md: "center" }}
          gap={4}
        >
          <Text
            fontSize="sm"
            color="gray.500"
            textAlign={{ base: "center", md: "left" }}
          >
            &copy; {currentYear} Tunji Productions. All rights reserved.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};
