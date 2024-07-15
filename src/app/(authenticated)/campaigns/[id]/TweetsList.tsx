"use client";
import AutoRenew from "@/components/AutoRenew";
import CardGroup from "@/components/CardGroup";
import { Flex, Grid, Switch } from "@radix-ui/themes";
import TweetCardContent from "./TweetCardContent";
import useOpenSlideScreen from "@/hooks/useOpenSlideScreen";
import SlideScreen from "@/components/SlideScreen";
import CreateTweetFields from "./CreateTweetFields";
import { Tweets } from "@prisma/client";
import PageHeading from "@/components/PageHeading";

type TweetsListProps = {
  campaignName: string;
  camapaignId: string;
  isAutoRenew: boolean;
  tweets: Tweets[];
};

function TweetsList({
  tweets,
  campaignName,
  camapaignId,
  isAutoRenew,
}: TweetsListProps) {
  const { isSlideScreenOpen, openSlideScreen } = useOpenSlideScreen();

  return (
    <>
      <Flex align="center" justify="between">
        <PageHeading>{campaignName}</PageHeading>
        <AutoRenew>
          <Switch
            defaultChecked={isAutoRenew}
            onCheckedChange={(e) => console.log(e)}
            name="autorenew"
          />
        </AutoRenew>
      </Flex>
      <Grid mt="8" gap="4" columns="repeat(auto-fill,minmax(250px, 1fr)">
        {tweets.map((tweet) => (
          <CardGroup
            key={tweet.id}
            cardTitle="John Doe"
            openSlideScreen={openSlideScreen}
            CardContent={
              <TweetCardContent tweet={tweet} campaingName={campaignName} />
            }
          />
        ))}
        <CardGroup createType openSlideScreen={openSlideScreen} />
      </Grid>
      <SlideScreen
        formTitle="Create tweet"
        FormContent={<CreateTweetFields campaignId={camapaignId} />}
        isSlideScreenOpen={isSlideScreenOpen}
        openSlideScreen={openSlideScreen}
      />
    </>
  );
}

export default TweetsList;

