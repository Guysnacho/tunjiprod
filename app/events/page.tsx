import { ConferenceRegistration } from "@/components/ConferenceRegistration";
import {
  Box,
  Container,
  Heading,
  List,
  Separator,
  Stack,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | The Soapbox",
  description:
    "Explore upcoming events at The Soapbox — installations, screenings, workshops, and performances pushing the boundaries of art and technology.",
};

export default function Page() {
  return (
    <Container maxW="6xl" py={10}>
      <Stack gap={10}>
        <Heading textAlign="center">Events</Heading>

        <Tabs.Root
          aria-label="Event Types"
          size="lg"
          fitted
          variant="enclosed"
          defaultValue="upcoming"
        >
          <Tabs.List>
            <Tabs.Trigger value="upcoming">Upcoming Events</Tabs.Trigger>
            <Tabs.Trigger value="installations">Installations</Tabs.Trigger>
            <Tabs.Trigger value="screenings">Screenings & Workshops</Tabs.Trigger>
          </Tabs.List>

          {/* Upcoming Events */}
          <Tabs.Content value="upcoming">
            <ConferenceRegistration />
          </Tabs.Content>

          {/* Installations */}
          <Tabs.Content value="installations">
            <Stack gap={8}>
              <Separator />

              <Text fontSize="lg">
                The Soapbox features immersive 4D art installations that blur
                the line between observer and participant. Each installation
                incorporates time, space, and interactivity as core materials.
              </Text>

              <List.Root pl={4} listStyle="disc">
                <List.Item>Interactive spatial environments</List.Item>
                <List.Item>Generative visual systems</List.Item>
                <List.Item>Sound-reactive sculptures</List.Item>
                <List.Item>Projection mapping experiences</List.Item>
              </List.Root>

              <Separator />

              <Text textAlign="center" fontWeight="medium" color="primary">
                Installation lineup coming soon
              </Text>
            </Stack>
          </Tabs.Content>

          {/* Screenings & Workshops */}
          <Tabs.Content value="screenings">
            <Stack gap={6}>
              <Separator />

              <Text fontSize="lg">
                Experience 5D film screenings and hands-on workshops led by
                pioneering artists and technologists. Our programming covers
                everything from experimental cinema to creative coding.
              </Text>

              <List.Root pl={4} listStyle="disc">
                <List.Item>Multi-sensory film premieres</List.Item>
                <List.Item>Sound design masterclasses</List.Item>
                <List.Item>Creative technology workshops</List.Item>
                <List.Item>Artist talks and panels</List.Item>
              </List.Root>

              <Separator />

              <Text textAlign="center" fontWeight="medium" color="primary">
                Full schedule coming soon
              </Text>
            </Stack>
          </Tabs.Content>
        </Tabs.Root>
      </Stack>
    </Container>
  );
}
