import Breadcrumb from "@/components/Breadcrumb";
import TweetsList from "./TweetsList";
import { getCampaignsWithTweets } from "@/utils/actions";
import { CampaignsWithTweets } from "@/utils/types";
import { capitalize } from "@/utils/string";

async function CampaignDetail({ params }: { params: { id: string } }) {
  const campaigns: CampaignsWithTweets = await getCampaignsWithTweets();

  if (campaigns === undefined) {
    return <p>No campaigns found</p>;
  }
  const { id } = params;
  const campaign = campaigns.find((campaign) => campaign.id === id);

  if (!campaign) {
    return <p>No campaigns found</p>;
  }

  const tweets = campaign?.tweets;

  return (
    <>
      <Breadcrumb
        items={[
          { title: "Campaigns", href: "/campaigns" },
          { title: capitalize(campaign.name), href: `/campaigns/${id}` },
        ]}
      />
      <TweetsList
        tweets={tweets}
        campaignName={campaign.name}
        camapaignId={id}
        isAutoRenew={campaign.isAutoRenew}
      />
    </>
  );
}

export default CampaignDetail;

