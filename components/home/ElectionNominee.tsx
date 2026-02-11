import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import {
  Card,
  Heading,
  Image,
  Separator,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react";
import EmbeddedVideo from "./EmbeddedVideo";

export type ElectionProps = {
  name?: string;
  avatar?: string;
  plans?: string[];
  isPrez?: boolean;
  recording?: string;
  overview?: {
    heading: string;
    content: string;
  }[];
  electionOver?: boolean;
};

export default function ElectionNominee({
  name,
  avatar,
  recording,
  plans,
  isPrez,
  overview,
  electionOver,
}: ElectionProps) {
  return (
    <Card.Root w={{ base: "90%", md: "xl", xl: "2xl" }}>
      <Card.Body>
        {avatar ? (
          <Image
            src={avatar}
            alt={name + " photo"}
            mx="auto"
            borderRadius="lg"
          />
        ) : undefined}
        <Stack mt="6" gap="3">
          {name ? <Heading size="md">{name}</Heading> : undefined}
          <Text color="blue.600" fontSize="lg">
            Brief overview {electionOver ? undefined : "of candidate"} for{" "}
            {isPrez ? "President" : "Student Board"}-Elect
          </Text>
          <AccordionRoot multiple>
            {overview?.map(({ content, heading }) => (
              <AccordionItem key={heading} value={heading} aria-label={heading}>
                <AccordionItemTrigger>
                  <Span flex="1" textAlign="left">
                    {heading}
                  </Span>
                </AccordionItemTrigger>
                <AccordionItemContent>{content}</AccordionItemContent>
              </AccordionItem>
            ))}
          </AccordionRoot>
          <Text color="blue.600" fontSize="lg">
            {isPrez &&
              electionOver &&
              "How do you plan to contribute to MCBIOS as the president?"}
            {isPrez &&
              !electionOver &&
              "If elected, how do you plan to contribute to MCBIOS as the president?"}
            {!isPrez &&
              electionOver &&
              "How do you plan to contribute to MCBIOS as a board member?"}
            {!isPrez &&
              !electionOver &&
              "If elected, how do you plan to contribute to MCBIOS as a board member?"}
          </Text>
          {plans ? (
            <AccordionRoot collapsible>
              {plans.map((plan, idx) => (
                <AccordionItem key={idx} value={`plan-${idx}`} aria-label={"plans " + idx}>
                  <AccordionItemTrigger>
                    <Span flex="1" textAlign="left">
                      {`${plan.split(":")[0]}`}
                    </Span>
                  </AccordionItemTrigger>
                  <AccordionItemContent>{plan.split(":")[1]}</AccordionItemContent>
                </AccordionItem>
              ))}
            </AccordionRoot>
          ) : undefined}
        </Stack>
      </Card.Body>
      <Separator />
      {recording && !electionOver ? (
        <Card.Footer display="flex" flexDirection="column" alignItems="center">
          <Text textAlign="center" color="blue.600" fontSize="lg">
            {name}&apos;s Address
          </Text>
          <EmbeddedVideo
            w={{ base: "full", md: "xl", xl: "2xl" }}
            className="max-w-md"
            mx="auto"
            src={recording!}
          />
        </Card.Footer>
      ) : undefined}
    </Card.Root>
  );
}
