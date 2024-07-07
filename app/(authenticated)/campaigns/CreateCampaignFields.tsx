import AutoRenew from "@/components/AutoRenew";
import { Button, Flex, Text, TextArea, TextField } from "@radix-ui/themes";

function CreateCampaignFields() {
  return (
    <>
      <Text as="p" size="2" style={{ color: "var(--secondary-light)" }}>
        Fill in the name and the topics you want to cover in your campaign.
      </Text>
      <TextField.Root
        placeholder="Name your campaign"
        style={{ width: "100%" }}
      />

      <TextArea
        rows={5}
        placeholder="What topics do you want to cover?"
        style={{ outline: "none", padding: "0.5rem", width: "100%" }}
      />
      <AutoRenew />
      <Flex justify="end" align="center" gap="3" width="100%">
        <Button variant="solid" size="2">
          Save
        </Button>
      </Flex>
    </>
  );
}

export default CreateCampaignFields;

