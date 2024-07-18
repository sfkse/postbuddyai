import PageHeading from "@/components/PageHeading";
import CampaignsContent from "./Campaigns";
import { getCampaignsWithTweets, getUser } from "@/utils/actions";
import Breadcrumb from "@/components/Breadcrumb";
import { CampaignsWithTweets } from "@/utils/types";
import ConnectTwitter from "@/components/ConnectTwitter";
import { User } from "@prisma/client";

async function Campaigns() {
  const user = (await getUser()) as User | null;

  if (user && !user.isTwitterConnected) {
    return <ConnectTwitter />;
  }
  const campaigns = (await getCampaignsWithTweets()) as CampaignsWithTweets[];

  return (
    <>
      <Breadcrumb items={[{ title: "Campaigns", href: "/campaigns" }]} />
      <PageHeading>Campaigns</PageHeading>
      <CampaignsContent campaigns={campaigns} />
    </>
  );
}

export default Campaigns;

