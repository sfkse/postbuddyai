"use client";

import Breadcrumb from "@/components/Breadcrumb";
import CampaignCardContent from "./CampaignCardContent";
import CardGroup from "@/components/CardGroup";
import CreateCampaignFields from "@/app/(authenticated)/campaigns/CreateCampaignFields";
import PageHeading from "@/components/PageHeading";
import SlideScreen from "@/components/SlideScreen";
import Tabs from "@/components/Tabs";
import useOpenSlideScreen from "@/hooks/useOpenSlideScreen";

function Campaigns() {
  const { isSlideScreenOpen, openSlideScreen } = useOpenSlideScreen();
  const items = ["Overview", "Flow"];
  return (
    <>
      <Breadcrumb items={[{ title: "Campaigns", href: "/campaigns" }]} />
      <PageHeading>Campaigns</PageHeading>
      <SlideScreen
        formTitle="Create campaign"
        FormContent={<CreateCampaignFields />}
        isSlideScreenOpen={isSlideScreenOpen}
        openSlideScreen={openSlideScreen}
      />
      <Tabs items={items}>
        <Tabs.Item items={items} />
        <Tabs.Content items={items}>
          <CardGroup
            openSlideScreen={openSlideScreen}
            showCreateOption
            CardContent={<CampaignCardContent />}
          />
        </Tabs.Content>
      </Tabs>
    </>
  );
}

export default Campaigns;

