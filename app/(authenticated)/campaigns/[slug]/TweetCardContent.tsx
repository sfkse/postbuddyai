import { ClockIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  Text,
  TextArea,
} from "@radix-ui/themes";
import React from "react";

function TweetCardContent() {
  return (
    <Flex direction="column" gap="5" mt="4" width="100%">
      <Flex align="start" gap="2" width="100%">
        <Avatar fallback="JD" size="3" radius="full" />
        <Flex direction="column" gap="3" width="100%">
          <Heading as="h2" size="3" weight="bold">
            John Doe
          </Heading>
          <Box width="100%">
            <Text>Hey, how is everything</Text>
          </Box>
        </Flex>
      </Flex>
      <Flex justify="between" align="center" gap="3" width="100%">
        <Badge variant="soft" color="orange">
          Scheduled
        </Badge>
        <Flex align="center" gap="2">
          <ClockIcon />
          <Text size="1" style={{ color: "var(--secondary)" }}>
            12:00 PM
          </Text>
        </Flex>
      </Flex>
      <Flex mt="-3">
        <Badge variant="soft" color="blue">
          Development
        </Badge>
      </Flex>
    </Flex>
  );
}

export default TweetCardContent;

