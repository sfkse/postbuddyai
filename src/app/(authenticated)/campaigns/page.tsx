import PageHeading from "@/components/PageHeading";
import CampaignsContent from "./Campaigns";
import { getCampaignsWithTweets } from "@/utils/actions";
import Breadcrumb from "@/components/Breadcrumb";
import { CampaignsWithTweets } from "@/utils/types";

async function Campaigns() {
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

