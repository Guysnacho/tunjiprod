"use client";

import {
  Box,
  Badge,
  Card,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuStar, LuSparkles, LuZap } from "react-icons/lu";

export type MembershipTier = "professional" | "postdoc" | "student";

export interface MembershipPlan {
  id: MembershipTier;
  name: string;
  subtitle: string;
  price: number;
  earlyBirdPrice: number;
  benefits: string[];
  icon: typeof LuStar;
  color: string;
}

export const membershipPlans: MembershipPlan[] = [
  {
    id: "professional",
    name: "Visionary",
    subtitle: "For Industry Professionals",
    price: 450,
    earlyBirdPrice: 400,
    benefits: ["VIP installation access", "Priority seating at screenings"],
    icon: LuZap,
    color: "purple",
  },
  {
    id: "postdoc",
    name: "Creator",
    subtitle: "For Artists & Filmmakers",
    price: 350,
    earlyBirdPrice: 300,
    benefits: ["Workshop participation", "Portfolio showcase opportunities"],
    icon: LuSparkles,
    color: "cyan",
  },
  {
    id: "student",
    name: "Observer",
    subtitle: "For Students & Enthusiasts",
    price: 250,
    earlyBirdPrice: 200,
    benefits: ["Full conference access", "Community networking events"],
    icon: LuStar,
    color: "cyan",
  },
];

interface MembershipPlansProps {
  onPlanSelect?: (plan: MembershipPlan) => void;
  showNote?: boolean;
  variant?: "card" | "inline";
}

export const MembershipPlans = ({
  onPlanSelect,
  showNote = true,
  variant = "card",
}: MembershipPlansProps) => {
  if (variant === "inline") {
    return (
      <Stack gap="8">
        {membershipPlans.map((plan) => (
          <Box
            key={plan.id}
            p="8"
            rounded="32px"
            bg={{ base: "gray.50", _dark: "gray.800" }}
            borderWidth="2px"
            borderColor="transparent"
            transition="all 0.2s"
            cursor="pointer"
            _hover={{ borderColor: "cyan.300", bg: "cyan.50/30", _dark: { borderColor: "cyan.700", bg: "cyan.950/30" } }}
            onClick={() => onPlanSelect?.(plan)}
            role="group"
          >
            <Flex justify="space-between" align="flex-start" mb="6">
              <Box>
                <Heading
                  as="h4"
                  fontSize="xl"
                  fontWeight="black"
                  color={{ base: "gray.900", _dark: "white" }}
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  {plan.name}
                </Heading>
                <Text
                  color={{ base: "gray.500", _dark: "gray.400" }}
                  fontSize="xs"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="widest"
                  mt="1"
                >
                  {plan.subtitle}
                </Text>

                <Stack
                  gap="3"
                  color={{ base: "gray.600", _dark: "gray.400" }}
                  fontSize="sm"
                  fontWeight="medium"
                  mt="3"
                >
                  {plan.benefits.map((benefit, idx) => (
                    <Flex key={idx} align="center" gap="3">
                      <Icon color="cyan.600" _dark={{ color: "cyan.400" }} boxSize="4">
                        <plan.icon />
                      </Icon>
                      <Text>{benefit}</Text>
                    </Flex>
                  ))}
                </Stack>
              </Box>
              <Box>
                <Text fontSize="4xl" fontWeight="black" color="cyan.600" _dark={{ color: "cyan.400" }}>
                  ${plan.price}
                </Text>
                <Badge colorPalette="green" variant="subtle" fontSize="xs">
                  ${plan.earlyBirdPrice} Early Bird
                </Badge>
              </Box>
            </Flex>
          </Box>
        ))}

        {showNote && (
          <Flex
            mt="4"
            p="6"
            bg="cyan.50/50"
            _dark={{ bg: "cyan.950/50" }}
            rounded="2xl"
            borderWidth="1px"
            borderColor="cyan.100"
            _dark-2={{ borderColor: "cyan.900" }}
            align="center"
            gap="4"
          >
            <Icon color="emerald.600" _dark={{ color: "emerald.400" }} boxSize="6">
              <LuSparkles />
            </Icon>
            <Text
              fontSize="11px"
              fontWeight="black"
              textTransform="uppercase"
              letterSpacing="widest"
              color={{ base: "gray.500", _dark: "gray.400" }}
              lineHeight="tight"
            >
              Conference registration includes a complimentary one-year
              community membership.
            </Text>
          </Flex>
        )}
      </Stack>
    );
  }

  // Card variant (for home page)
  return (
    <Card.Root
      bg="white"
      _dark={{ bg: "gray.800" }}
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="xl"
    >
      <Box p={{ base: 6, md: 8 }}>
        <Text
          fontSize="sm"
          fontWeight="600"
          textTransform="uppercase"
          letterSpacing="wider"
          color="gray.500"
          _dark={{ color: "gray.400" }}
          mb="6"
        >
          Conference Registration
        </Text>

        <Stack gap="4">
          {membershipPlans.map((plan) => (
            <Box
              key={plan.id}
              p="5"
              borderRadius="xl"
              borderWidth="1px"
              borderColor="gray.200"
              _dark={{ borderColor: "gray.700" }}
              transition="all 0.2s"
              cursor="pointer"
              onClick={() => onPlanSelect?.(plan)}
              _hover={{
                borderColor: "cyan.300",
                bg: "cyan.50",
                boxShadow: "0 0 20px rgba(6, 182, 212, 0.15)",
                transform: "translateY(-2px)",
                _dark: { borderColor: "cyan.700", bg: "cyan.950" },
              }}
            >
              <Flex justify="space-between" align="flex-start" mb="3">
                <Box>
                  <Text
                    fontWeight="700"
                    color="gray.900"
                    _dark={{ color: "white" }}
                    fontSize="lg"
                  >
                    {plan.name}
                  </Text>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    {plan.subtitle}
                  </Text>
                </Box>
                <Box textAlign="right">
                  <Flex align="baseline" gap="1">
                    <Text
                      fontSize="3xl"
                      fontWeight="700"
                      color="cyan.600"
                      _dark={{ color: "cyan.400" }}
                    >
                      ${plan.price}
                    </Text>
                  </Flex>
                  <Badge colorPalette="green" variant="subtle" fontSize="xs">
                    ${plan.earlyBirdPrice} Early Bird
                  </Badge>
                </Box>
              </Flex>
              <Stack gap="2">
                {plan.benefits.map((benefit, idx) => (
                  <Flex key={idx} align="center" gap="2">
                    <Icon color="cyan.600" _dark={{ color: "cyan.400" }} boxSize="3.5">
                      <LuStar />
                    </Icon>
                    <Text
                      fontSize="sm"
                      color="gray.600"
                      _dark={{ color: "gray.400" }}
                    >
                      {benefit}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>

        {showNote && (
          <Flex
            bg="cyan.50"
            _dark={{ bg: "cyan.950" }}
            borderRadius="lg"
            p="4"
            gap="3"
            align="flex-start"
            mt="6"
          >
            <Flex
              w="6"
              h="6"
              bg="cyan.100"
              _dark={{ bg: "cyan.900" }}
              borderRadius="full"
              align="center"
              justify="center"
              flexShrink={0}
              mt="0.5"
            >
              <Icon color="cyan.600" _dark={{ color: "cyan.400" }} boxSize="3">
                <LuSparkles />
              </Icon>
            </Flex>
            <Text
              fontSize="xs"
              color="cyan.700"
              my="auto"
              _dark={{ color: "cyan.200" }}
            >
              Registration fee includes complimentary one-year community
              membership.
            </Text>
          </Flex>
        )}
      </Box>
    </Card.Root>
  );
};
