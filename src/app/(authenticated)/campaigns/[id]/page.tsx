"use client";

import AutoRenew from "@/components/AutoRenew";
import Breadcrumb from "@/components/Breadcrumb";
import CardGroup from "@/components/CardGroup";
import SlideScreen from "@/components/SlideScreen";
import PageHeading from "@/components/PageHeading";
import { capitalize } from "@/utils/string";
import { Flex, Switch } from "@radix-ui/themes";
import { useParams } from "next/navigation";
import useOpenSlideScreen from "@/hooks/useOpenSlideScreen";
import TweetCardContent from "./TweetCardContent";
import CreateTweetFields from "./CreateTweetFields";

function CampaignDetail() {
  const { id } = useParams();
  const { isSlideScreenOpen, openSlideScreen } = useOpenSlideScreen();

  const breadcrumbItems = [
    { title: "Campaigns", href: "/campaigns" },
    { title: capitalize(id as string), href: "" },
  ];
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <Flex align="center" justify="between">
        <PageHeading>{capitalize(id as string)}</PageHeading>
        <AutoRenew>
          <Switch onCheckedChange={(e) => console.log(e)} name="autorenew" />
        </AutoRenew>
      </Flex>
      <CardGroup
        CardContent={<TweetCardContent />}
        openSlideScreen={openSlideScreen}
      />
      <SlideScreen
        formTitle="Create tweet"
        FormContent={<CreateTweetFields />}
        isSlideScreenOpen={isSlideScreenOpen}
        openSlideScreen={openSlideScreen}
      />
    </>
  );
}

export default CampaignDetail;

