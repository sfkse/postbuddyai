"use client";

import CardGroup from "@/components/CardGroup";
import Tabs from "@/components/Tabs";
import useOpenSlideScreen from "@/hooks/useOpenSlideScreen";
import React from "react";
import CampaignCardContent from "./CampaignCardContent";
import SlideScreen from "@/components/SlideScreen";
import CreateCampaignFields from "./CreateCampaignFields";
import { Campaign } from "@prisma/client";
import { Grid } from "@radix-ui/themes";

type CampaignsProps = {
  campaigns: Campaign[];
};

function Campaigns({ campaigns }: CampaignsProps) {
  const { isSlideScreenOpen, openSlideScreen } = useOpenSlideScreen();
  const items = ["Overview", "Flow"];
  console.log(campaigns);
  return (
    <>
      <Tabs items={items}>
        <Tabs.Item items={items} />
        <Tabs.Content items={items}>
          <Grid mt="8" gap="4" columns="repeat(auto-fill,minmax(250px, 1fr)">
            {campaigns.map((campaign) => (
              <CardGroup
                href={`/campaigns/${campaign.id}`}
                key={campaign.id}
                cardTitle={campaign.name}
                openSlideScreen={openSlideScreen}
                CardContent={<CampaignCardContent campaign={campaign} />}
              />
            ))}
            <CardGroup createType openSlideScreen={openSlideScreen} />
          </Grid>
        </Tabs.Content>
      </Tabs>
      <SlideScreen
        formTitle="Create campaign"
        FormContent={<CreateCampaignFields />}
        isSlideScreenOpen={isSlideScreenOpen}
        openSlideScreen={openSlideScreen}
      />
    </>
  );
}

export default Campaigns;

