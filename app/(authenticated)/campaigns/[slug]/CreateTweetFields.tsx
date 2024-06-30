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
import ScheduleTweetModal from "./ScheduleTweetModal";
import useOpenModal from "@/app/hooks/useOpenModal";
import { createPortal } from "react-dom";

function CreateTweetFields() {
  const { isOpen, closeModal, openModal } = useOpenModal();
  return (
    <>
      {createPortal(
        <ScheduleTweetModal isOpen={isOpen} closeModal={closeModal} />,
        document.body
      )}
      <Text as="p" size="2" style={{ color: "var(--secondary-light)" }}>
        Tweets created with AI will be around the topics: React, Next.js, and
        Radix UI.
      </Text>
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
      <Flex align="center" gap="3" width="100%">
        <Flex align="center" gap="2">
          <Strong>Schedule tweet</Strong> -
          <Button variant="ghost" type="button" onClick={openModal}>
            Set
          </Button>
        </Flex>
      </Flex>
      <Flex justify="end" align="center" gap="3" width="100%">
        <Button variant="soft" size="2">
          <Pencil1Icon /> Save as draft
        </Button>
        <Button variant="solid" size="2">
          Save
        </Button>
      </Flex>
    </>
  );
}

export default CreateTweetFields;

