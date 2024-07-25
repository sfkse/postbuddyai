"use client";

import { getRequestToken } from "@/utils/actions";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";

type ConnectTwitterProps = {
  isLoading?: boolean;
};
function ConnectTwitter({ isLoading }: ConnectTwitterProps) {
  const connectTwitter = async () => {
    const token = await getRequestToken();
    window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${token}`;
  };

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
      <form action={connectTwitter}>
        <Button variant="solid" size="2" loading={isLoading}>
          <TwitterLogoIcon />
          Connect
        </Button>
      </form>
    </Flex>
  );
}

export default ConnectTwitter;

