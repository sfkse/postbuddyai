"use client";

import AutoRenew from "@/app/components/AutoRenew";
import Breadcrumb from "@/app/components/Breadcrumb";
import CardGroup from "@/app/components/CardGroup";
import SlideScreen from "@/app/components/SlideScreen";
import PageHeading from "@/app/components/PageHeading";
import { capitalize } from "@/app/utils/string";
import { Flex } from "@radix-ui/themes";
import { useParams } from "next/navigation";
import useOpenSlideScreen from "@/app/hooks/useOpenSlideScreen";
import CreateTweetFields from "@/app/(authenticated)/campaigns/[slug]/CreateTweetFields";
import TweetCardContent from "./TweetCardContent";

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

