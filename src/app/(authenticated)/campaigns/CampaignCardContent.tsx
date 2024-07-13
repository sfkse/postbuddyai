import { Box, Flex, Strong, Text, Tooltip } from "@radix-ui/themes";
import Badge from "../../../components/Badge";
import { formatToXDaysAgo } from "@/utils/dates";
import { CampaignsWithTweets } from "@/utils/types";

type CampaignCardContentProps = {
  campaign: CampaignsWithTweets;
};

function CampaignCardContent({ campaign }: CampaignCardContentProps) {
  return (
    <Flex gap="2" mt="4" direction="column">
      <Flex maxWidth="100%" gap="2" align="center">
        <Tooltip content="React, Next.js, Radix UI">
          <Text as="span" size="2" truncate>
            <Strong>Topics: </Strong>
            {campaign.topics}
          </Text>
        </Tooltip>
      </Flex>
      <Box style={{ color: "var(--secondary-light)" }}>
        <Text as="span" size="2">
          <Strong>Tweets:</Strong>{" "}
          {`${campaign.tweets.length} / ${campaign.tweets.length}`}
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

