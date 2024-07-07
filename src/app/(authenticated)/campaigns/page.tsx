"use client";

import Breadcrumb from "@/src/components/Breadcrumb";
import CampaignCardContent from "./CampaignCardContent";
import CardGroup from "@/src/components/CardGroup";
import CreateCampaignFields from "@/src/app/(authenticated)/campaigns/CreateCampaignFields";
import PageHeading from "@/src/components/PageHeading";
import SlideScreen from "@/src/components/SlideScreen";
import Tabs from "@/src/components/Tabs";
import useOpenSlideScreen from "@/src/hooks/useOpenSlideScreen";

function Campaigns() {
  const { isSlideScreenOpen, openSlideScreen } = useOpenSlideScreen();
  const items = ["Overview", "Flow"];
  return (
    <>
      <Breadcrumb items={[{ title: "Campaigns", href: "/campaigns" }]} />
      <PageHeading>Campaigns</PageHeading>
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

