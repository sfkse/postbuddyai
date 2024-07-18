import Breadcrumb from "@/components/Breadcrumb";
import PageHeading from "@/components/PageHeading";
import QueueContent from "./QueueContent";
import { getActiveTweets, getUser } from "@/utils/actions";
import { User } from "@prisma/client";
import ConnectTwitter from "@/components/ConnectTwitter";
import { TweetsWithCampaignName } from "@/utils/types";

async function Queue() {
  const user = (await getUser()) as User | null;

  if (user && !user.isTwitterConnected) {
    return <ConnectTwitter />;
  }
  const tweets = (await getActiveTweets()) as TweetsWithCampaignName[];

  return (
    <>
      <Breadcrumb items={[{ title: "Queue", href: "/queue" }]} />
      <PageHeading>Queue</PageHeading>
      <QueueContent tweets={tweets} />
    </>
  );
}

export default Queue;

