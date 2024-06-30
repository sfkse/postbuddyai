import Modal from "@/app/components/Modal";
import { Button, Flex, Heading, Text, Theme } from "@radix-ui/themes";
import React from "react";

type ScheduleTweetModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

function ScheduleTweetModal({ isOpen, closeModal }: ScheduleTweetModalProps) {
  return (
    <Theme>
      {isOpen && (
        <Modal>
          <Modal.Header>
            <Heading as="h3">Schedule tweet</Heading>
          </Modal.Header>
          <Modal.Body>
            <Text as="p" size="2" style={{ color: "var(--secondary-light)" }}>
              Schedule your tweet to be posted at a later time.
            </Text>

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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="soft" size="2" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="solid" size="2">
              Schedule
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Theme>
  );
}

export default ScheduleTweetModal;

