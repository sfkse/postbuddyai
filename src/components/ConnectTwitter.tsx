import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";

function ConnectTwitter() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="5"
      height="60vh"
    >
      <Heading as="h1" size="7" style={{ color: "var(--secondary-light)" }}>
        Connect Twitter
      </Heading>
      <Text size="2" style={{ color: "var(--secondary-light)" }}>
        To use this application, you need to connect your Twitter account.
      </Text>
      <Button variant="solid" size="2">
        <TwitterLogoIcon />
        Connect
      </Button>
    </Flex>
  );
}

export default ConnectTwitter;

