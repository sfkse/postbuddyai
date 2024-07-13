"use client";
import { MagicWandIcon, Pencil1Icon } from "@radix-ui/react-icons";
import {
  Avatar,
  Button,
  Flex,
  Heading,
  IconButton,
  Strong,
  Text,
  TextArea,
  Tooltip,
} from "@radix-ui/themes";
import { createTweet } from "@/utils/actions";

type CreateTweetFieldsProps = {
  campaignId: string;
};

function CreateTweetFields({ campaignId }: CreateTweetFieldsProps) {
  return (
    <>
      <Text as="p" size="2" style={{ color: "var(--secondary-light)" }}>
        Tweets created with AI will be around the topics: React, Next.js, and
        Radix UI.
      </Text>
      <form action={createTweet} style={{ width: "100%" }}>
        <Flex align="start" gap="2" width="100%">
          <Avatar fallback="JD" size="3" radius="full" />
          <Flex direction="column" gap="3" width="100%">
            <Heading as="h2" size="3" weight="bold">
              John Doe
            </Heading>
            <TextArea
              rows={5}
              placeholder="What is happening?"
              style={{ outline: "none", padding: "0.5rem" }}
              name="content"
            />
            <Flex justify="between" align="center" gap="3" width="100%">
              <IconButton radius="small" variant="soft">
                <Tooltip content="Suggest with AI">
                  <MagicWandIcon />
                </Tooltip>
              </IconButton>
              <Text size="1" style={{ color: "var(--secondary)" }}>
                0/280
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex align="center" gap="2" mt="7">
          <Strong>Schedule tweet</Strong> -
          {/* <Modal name="create">
            <Modal.Trigger>
              <Button>Set</Button>
            </Modal.Trigger>
            <Modal.Content
              title="Schedule tweet"
              description="Tweets created with AI will be around the topics: React, Next.js, and Radix UI."
            > */}
          {/* <Flex gap="4" mt="5">
            <Flex gap="2">
              <Text as="label" size="2" style={{ color: "var(--secondary)" }}>
                Date
              </Text> */}
          <input type="date" name="date" />
          {/* </Flex> */}
          {/* <Flex gap="2">
              <Text as="label" size="2" style={{ color: "var(--secondary)" }}>
                Time
              </Text> */}
          <input type="time" name="time" />
          {/* </Flex>
          </Flex> */}
          {/* </Modal.Content>
          </Modal> */}
          <input type="hidden" name="campaignId" value={campaignId} />
        </Flex>
        <Flex justify="end" align="center" gap="3" width="100%" mt="7">
          <Button variant="soft" size="2" name="saveDraft">
            <Pencil1Icon /> Save as draft
          </Button>
          <Button variant="solid" size="2" name="save">
            Save
          </Button>
        </Flex>
      </form>
    </>
  );
}

export default CreateTweetFields;
