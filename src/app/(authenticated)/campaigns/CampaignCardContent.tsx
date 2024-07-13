import { Box, Flex, Strong, Text, Tooltip } from "@radix-ui/themes";
import Badge from "../../../components/Badge";
import { Campaign } from "@prisma/client";

type CampaignCardContentProps = {
  campaign: Campaign;
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
          <Strong>Tweets:</Strong> 5/10
        </Text>
      </Box>
      <Box style={{ color: "var(--secondary-light)" }}>
        <Text as="span" size="2">
          <Strong>Created:</Strong> 2 days ago
        </Text>
      </Box>
      <Flex>
        <Badge color="orange" text="In progress" />
      </Flex>
    </Flex>
  );
}

export default CampaignCardContent;

