import Breadcrumb from "@/components/Breadcrumb";
import TweetsList from "./TweetsList";
import { getCampaignsWithTweets, getUser } from "@/utils/actions";
import { CampaignsWithTweets } from "@/utils/types";
import { capitalize } from "@/utils/string";
import { User } from "@prisma/client";
import ConnectTwitter from "@/components/ConnectTwitter";

async function CampaignDetail({ params }: { params: { id: string } }) {
  const user = (await getUser()) as User | null;

  if (user && !user.isTwitterConnected) {
    return <ConnectTwitter />;
  }
  const campaigns = (await getCampaignsWithTweets()) as CampaignsWithTweets[];

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
        campaignName={campaign.name}
        camapaignId={id}
        isAutoRenew={campaign.isAutoRenew}
      />
    </>
  );
}

export default CampaignDetail;

