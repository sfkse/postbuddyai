"use client";
import CardGroup from "@/components/CardGroup";
import useToggleSlideScreen from "@/hooks/useToggleSlideScreen";
import CampaignCardContent from "./CampaignCardContent";
import SlideScreen from "@/components/SlideScreen";
import CampaignFormFields from "./CampaignFormFields";
import { Grid } from "@radix-ui/themes";
import { CampaignsWithTweets } from "@/utils/types";
import { deleteCampaign } from "@/utils/actions";
import { useState } from "react";

type CampaignsProps = {
  campaigns: CampaignsWithTweets[];
};

function Campaigns({ campaigns }: CampaignsProps) {
  const { isSlideScreenOpen, toggleSlideScreen } = useToggleSlideScreen();
  const [campaignToBeUpdated, setCampaignToBeUpdated] =
    useState<CampaignsWithTweets | null>(null);

  const getDropdownItems = (campaign: CampaignsWithTweets) => [
    {
      label: "Edit",
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        toggleSlideScreen();
        setCampaignToBeUpdated(campaign);
      },
    },
    {
      label: "Delete",
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        deleteCampaign(campaign.id);
      },
      color: "red" as "red",
    },
  ];

  return (
    <>
      <Grid mt="8" gap="4" columns="repeat(auto-fill,minmax(250px, 1fr)">
        {campaigns.map((campaign) => (
          <CardGroup
            dropdownItems={getDropdownItems(campaign)}
            href={`/campaigns/${campaign.id}`}
            key={campaign.id}
            cardTitle={campaign.name}
            toggleSlideScreen={toggleSlideScreen}
            CardContent={<CampaignCardContent campaign={campaign} />}
          />
        ))}
        <CardGroup createType toggleSlideScreen={toggleSlideScreen} />
      </Grid>
      <SlideScreen
        formTitle="Create campaign"
        FormContent={<CampaignFormFields campaign={campaignToBeUpdated} />}
        isSlideScreenOpen={isSlideScreenOpen}
        toggleSlideScreen={toggleSlideScreen}
      />
    </>
  );
}

export default Campaigns;

