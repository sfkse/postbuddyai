"use client";
import CardGroup from "@/components/CardGroup";
import useOpenSlideScreen from "@/hooks/useOpenSlideScreen";
import CampaignCardContent from "./CampaignCardContent";
import SlideScreen from "@/components/SlideScreen";
import CreateCampaignFields from "./CreateCampaignFields";
import { Grid } from "@radix-ui/themes";
import { CampaignsWithTweets } from "@/utils/types";
import { deleteCampaign } from "@/utils/actions";

type CampaignsProps = {
  campaigns: CampaignsWithTweets[];
};

function Campaigns({ campaigns }: CampaignsProps) {
  const { isSlideScreenOpen, openSlideScreen } = useOpenSlideScreen();

  const getDropdownItems = (id: string) => [
    {
      label: "Edit",
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        console.log("Clicked Edit");
      },
    },
    {
      label: "Delete",
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        deleteCampaign(id);
      },
      color: "red" as "red",
    },
  ];

  return (
    <>
      <Grid mt="8" gap="4" columns="repeat(auto-fill,minmax(250px, 1fr)">
        {campaigns.map((campaign) => (
          <CardGroup
            dropdownItems={getDropdownItems(campaign.id)}
            href={`/campaigns/${campaign.id}`}
            key={campaign.id}
            cardTitle={campaign.name}
            openSlideScreen={openSlideScreen}
            CardContent={<CampaignCardContent campaign={campaign} />}
          />
        ))}
        <CardGroup createType openSlideScreen={openSlideScreen} />
      </Grid>
      <SlideScreen
        formTitle="Create campaign"
        FormContent={<CreateCampaignFields />}
        isSlideScreenOpen={isSlideScreenOpen}
        openSlideScreen={openSlideScreen}
      />
    </>
  );
}

export default Campaigns;

