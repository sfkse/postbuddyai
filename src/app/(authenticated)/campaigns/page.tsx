import PageHeading from "@/components/PageHeading";
import CampaignsContent from "./Campaigns";
import { getCampaignsWithTweets } from "@/utils/actions";
import Breadcrumb from "@/components/Breadcrumb";

async function Campaigns() {
  const campaigns = await getCampaignsWithTweets();

  return (
    <>
      <Breadcrumb items={[{ title: "Campaigns", href: "/campaigns" }]} />
      <PageHeading>Campaigns</PageHeading>
      <CampaignsContent campaigns={campaigns} />
    </>
  );
}

export default Campaigns;

