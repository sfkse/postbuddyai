import { formatToXDaysAgo } from "@/utils/dates";
import { Tweets } from "@prisma/client";
import { ClockIcon } from "@radix-ui/react-icons";
import { Badge, Box, Flex, Text } from "@radix-ui/themes";

type TweetCardContentProps = {
  tweet: Tweets;
};

function TweetCardContent({ tweet }: TweetCardContentProps) {
  return (
    <Flex direction="column" gap="5" mt="4" width="100%">
      <Flex align="start" gap="2" width="100%">
        {/* <Avatar fallback="JD" size="3" radius="full" /> */}
        <Flex direction="column" gap="3" width="100%">
          {/* <Heading as="h2" size="3" weight="bold">
            John Doe
          </Heading> */}
          <Box width="100%">
            <Text>{tweet.content}</Text>
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
            {formatToXDaysAgo(tweet.scheduledAt)}
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

