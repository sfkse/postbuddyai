"use client";
import CardGroup from "@/components/CardGroup";
import Tabs from "@/components/Tabs";
import { Grid } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import TweetCardContent from "../campaigns/[id]/TweetCardContent";
import { isTimePassed, isTimeWithinTheDay } from "@/utils/dates";
import { TweetsWithCampaignName } from "@/utils/types";

type QueueContentProps = {
  tweets: TweetsWithCampaignName[];
};

function QueueContent({ tweets }: QueueContentProps) {
  const items = [
    { title: "Today", href: "queue?selected=today" },
    { title: "Upcoming", href: "queue?selected=upcoming" },
    { title: "Posted", href: "queue?selected=posted" },
  ];
  const params = useSearchParams();
  const selected = params.get("selected") || "today";

  const todaysTweets = tweets.filter(
    (tweet) =>
      !isTimePassed(tweet.scheduledAt) && isTimeWithinTheDay(tweet.scheduledAt)
  );

  const upcomingTweets = tweets.filter(
    (tweet) =>
      !isTimePassed(tweet.scheduledAt) && !isTimeWithinTheDay(tweet.scheduledAt)
  );

  const postedTweets = tweets.filter((tweet) =>
    isTimePassed(tweet.scheduledAt)
  );

  const TodaysTweets = () => (
    <>
      {todaysTweets.map((tweet) => (
        <CardGroup
          key={tweet.id}
          cardTitle="John Doe"
          CardContent={
            <TweetCardContent
              tweet={tweet}
              campaingName={tweet.campaign.name}
            />
          }
        />
      ))}
    </>
  );

  const UpcomingTweets = () => (
    <>
      {upcomingTweets.map((tweet) => (
        <CardGroup
          key={tweet.id}
          cardTitle="John Doe"
          CardContent={
            <TweetCardContent
              campaingName={tweet.campaign.name}
              tweet={tweet}
            />
          }
        />
      ))}
    </>
  );

  const PostedTweets = () => (
    <>
      {postedTweets.map((tweet) => (
        <CardGroup
          key={tweet.id}
          cardTitle="John Doe"
          CardContent={
            <TweetCardContent
              campaingName={tweet.campaign.name}
              tweet={tweet}
            />
          }
        />
      ))}
    </>
  );

  return (
    <>
      <Tabs>
        <Tabs.Item items={items} selected={selected} />
      </Tabs>
      <Grid mt="8" gap="4" columns="repeat(auto-fill,minmax(250px, 1fr)">
        {selected === "today" && <TodaysTweets />}
        {selected === "upcoming" && <UpcomingTweets />}
        {selected === "posted" && <PostedTweets />}
      </Grid>
    </>
  );
}

export default QueueContent;

