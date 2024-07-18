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
import { createTweet, generateTweet } from "@/utils/actions";
import { useState } from "react";
import { ETweetStatus } from "@/utils/enums";

type CreateTweetFieldsProps = {
  campaignId: string;
};

function CreateTweetFields({ campaignId }: CreateTweetFieldsProps) {
  const [suggestedTweet, setSuggestedTweet] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const maxTweetLength = 280;

  const suggestTweet = async () => {
    setLoading(true);
    const tweet = await generateTweet("React, Next.js, and Radix UI");
    if (!tweet) {
      setError("There is a problem with the API. Please try again later.");
      setLoading(false);
      return;
    }
    setSuggestedTweet(tweet as string);
    setLoading(false);
  };
  console.log(suggestedTweet);
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
              required
              value={suggestedTweet}
              onChange={(e) => {
                setSuggestedTweet(e.currentTarget.value);
              }}
              maxLength={maxTweetLength}
            />
            {error && (
              <Text size="1" color="red">
                There is a problem with the API. Please try again later.
              </Text>
            )}
            <Flex justify="between" align="center" gap="3" width="100%">
              <IconButton
                radius="small"
                variant="soft"
                onClick={suggestTweet}
                loading={loading}
              >
                <Tooltip content="Suggest with AI">
                  <MagicWandIcon />
                </Tooltip>
              </IconButton>
              <Text size="1" style={{ color: "var(--secondary)" }}>
                {`${suggestedTweet.length}/280`}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex align="center" gap="2" mt="7">
          <Strong>Schedule tweet</Strong> -
          <input type="date" name="date" required />
          <input type="time" name="time" required />
          <input type="hidden" name="campaignId" value={campaignId} />
        </Flex>
        <Flex justify="end" align="center" gap="3" width="100%" mt="7">
          <Button
            variant="soft"
            size="2"
            name="status"
            value={ETweetStatus.DRAFT}
          >
            <Pencil1Icon /> Save as draft
          </Button>
          <Button
            variant="solid"
            size="2"
            name="status"
            value={ETweetStatus.ACTIVE}
          >
            Save
          </Button>
        </Flex>
      </form>
    </>
  );
}

export default CreateTweetFields;

