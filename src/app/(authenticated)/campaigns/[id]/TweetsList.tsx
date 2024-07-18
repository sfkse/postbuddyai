"use client";
import AutoRenew from "@/components/AutoRenew";
import CardGroup from "@/components/CardGroup";
import { Flex, Grid, Switch } from "@radix-ui/themes";
import TweetCardContent from "./TweetCardContent";
import useToggleSlideScreen from "@/hooks/useToggleSlideScreen";
import SlideScreen from "@/components/SlideScreen";
import CreateTweetFields from "./CreateTweetFields";
import { Tweets } from "@prisma/client";
import PageHeading from "@/components/PageHeading";
import { useEffect, useState } from "react";
import { getCampaignTweets } from "@/utils/actions";

type TweetsListProps = {
  campaignName: string;
  camapaignId: string;
  isAutoRenew: boolean;
};

function TweetsList({
  campaignName,
  camapaignId,
  isAutoRenew,
}: TweetsListProps) {
  const { isSlideScreenOpen, toggleSlideScreen } = useToggleSlideScreen();
  const [tweets, setTweets] = useState<Tweets[]>([]);

  useEffect(() => {
    const fetchTweets = async () => {
      const tweets = await getCampaignTweets(camapaignId);

      setTweets(tweets as Tweets[]);
    };

    fetchTweets();
  }, [camapaignId]);
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
            toggleSlideScreen={toggleSlideScreen}
            CardContent={
              <TweetCardContent tweet={tweet} campaingName={campaignName} />
            }
          />
        ))}
        <CardGroup createType toggleSlideScreen={toggleSlideScreen} />
      </Grid>
      <SlideScreen
        formTitle="Create tweet"
        FormContent={<CreateTweetFields campaignId={camapaignId} />}
        isSlideScreenOpen={isSlideScreenOpen}
        toggleSlideScreen={toggleSlideScreen}
      />
    </>
  );
}

export default TweetsList;

