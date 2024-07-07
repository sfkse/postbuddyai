import { Flex, Text } from "@radix-ui/themes";

function ScheduleTweetModal() {
  return (
    <Flex direction="column" gap="4" mt="5">
      <Flex gap="2">
        <Text as="label" size="2" style={{ color: "var(--secondary)" }}>
          Date
        </Text>
        <input type="date" />
      </Flex>
      <Flex gap="2">
        <Text as="label" size="2" style={{ color: "var(--secondary)" }}>
          Time
        </Text>
        <input type="time" />
      </Flex>
    </Flex>
  );
}

export default ScheduleTweetModal;

