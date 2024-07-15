import { Box, Flex, Strong, Text, Tooltip } from "@radix-ui/themes";
import Badge from "../../../components/Badge";
import { formatToXDaysAgo } from "@/utils/dates";
import { CampaignsWithTweets } from "@/utils/types";
import { ETweetStatus } from "@/utils/enums";

type CampaignCardContentProps = {
  campaign: {
    id: string;
    name: string;
    topics: string;
    tweets: {
      status: number;
      length: number;
    };
    createdAt: string;
  } & CampaignsWithTweets;
};

function CampaignCardContent({ campaign }: CampaignCardContentProps) {
  return (
    <Flex gap="2" mt="4" direction="column">
      <Flex maxWidth="100%" gap="2" align="center">
        <Tooltip content={campaign.topics}>
          <Text as="span" size="2" truncate>
            <Strong>Topics: </Strong>
            {campaign.topics}
          </Text>
        </Tooltip>
      </Flex>
      <Box style={{ color: "var(--secondary-light)" }}>
        <Text as="span" size="2">
          <Strong>Tweets:</Strong>{" "}
          {/* TODO://Check if this works correctly after implementing the logic for sending tweets in the backend */}
          {`${
            campaign.tweets.filter(
              (tweet) =>
                tweet.status !== ETweetStatus.ACTIVE && !ETweetStatus.SENT
            ).length
          } / ${campaign.tweets.length}`}
        </Text>
      </Box>
      <Box style={{ color: "var(--secondary-light)" }}>
        <Text as="span" size="2">
          <Strong>Created:</Strong> {formatToXDaysAgo(campaign.createdAt)}
        </Text>
      </Box>
      <Flex>
        <Badge color="orange" text="In progress" />
      </Flex>
    </Flex>
  );
}

export default CampaignCardContent;

