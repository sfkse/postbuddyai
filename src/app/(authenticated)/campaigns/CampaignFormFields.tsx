"use client";
import AutoRenew from "@/components/AutoRenew";
import useToggleSlideScreen from "@/hooks/useToggleSlideScreen";
import { createCampaign, updateCampaign } from "@/utils/actions";
import { CampaignsWithTweets } from "@/utils/types";
import {
  Button,
  Flex,
  Switch,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";

type CampaignFormFieldsProps = {
  campaign: null | CampaignsWithTweets;
};

function CampaignFormFields({ campaign }: CampaignFormFieldsProps) {
  const { toggleSlideScreen } = useToggleSlideScreen();

  const handleSubmitCampaign = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const topics = formData.get("topics") as string;
    const autorenew = formData.get("autorenew") as string;

    const campaignData = {
      name,
      topics,
      isAutoRenew: autorenew === "on",
    };

    if (campaign) {
      await updateCampaign(campaignData, campaign.id);
    } else {
      await createCampaign(campaignData);
    }
    toggleSlideScreen();
  };
  return (
    <>
      <Text as="p" size="2" style={{ color: "var(--secondary-light)" }}>
        Fill in the name and the topics you want to cover in your campaign.
      </Text>
      <form
        onSubmit={handleSubmitCampaign}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <TextField.Root
          placeholder="Name your campaign"
          style={{ width: "100%" }}
          name="name"
          defaultValue={campaign?.name || ""}
        />

        <TextArea
          rows={5}
          placeholder="What topics do you want to cover?"
          style={{ outline: "none", padding: "0.5rem", width: "100%" }}
          name="topics"
          defaultValue={campaign?.topics || ""}
        />
        <Flex>
          <AutoRenew>
            <Switch
              defaultChecked={campaign?.isAutoRenew || false}
              onCheckedChange={(e) => console.log(e)}
              name="autorenew"
            />
          </AutoRenew>
        </Flex>
        <Flex justify="end" align="center" gap="3" width="100%">
          <Button variant="solid" size="2">
            Save
          </Button>
        </Flex>
      </form>
    </>
  );
}

export default CampaignFormFields;

