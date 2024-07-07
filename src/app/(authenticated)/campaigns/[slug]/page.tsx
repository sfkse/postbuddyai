"use client";

import AutoRenew from "@/src/components/AutoRenew";
import Breadcrumb from "@/src/components/Breadcrumb";
import CardGroup from "@/src/components/CardGroup";
import SlideScreen from "@/src/components/SlideScreen";
import PageHeading from "@/src/components/PageHeading";
import { capitalize } from "@/src/utils/string";
import { Flex } from "@radix-ui/themes";
import { useParams } from "next/navigation";
import useOpenSlideScreen from "@/src/hooks/useOpenSlideScreen";
import TweetCardContent from "./TweetCardContent";
import CreateTweetFields from "./CreateTweetFields";

function CampaignDetail() {
  const { slug } = useParams();
  const { isSlideScreenOpen, openSlideScreen } = useOpenSlideScreen();

  const breadcrumbItems = [
    { title: "Campaigns", href: "/campaigns" },
    { title: capitalize(slug as string), href: "" },
  ];
  return (
    <>
      <SlideScreen
        formTitle="Create tweet"
        FormContent={<CreateTweetFields />}
        isSlideScreenOpen={isSlideScreenOpen}
        openSlideScreen={openSlideScreen}
      />
      <Breadcrumb items={breadcrumbItems} />
      <Flex align="center" justify="between">
        <PageHeading>{capitalize(slug as string)}</PageHeading>
        <AutoRenew />
      </Flex>
      <CardGroup
        showCreateOption
        CardContent={<TweetCardContent />}
        openSlideScreen={openSlideScreen}
      />
    </>
  );
}

export default CampaignDetail;

