import Breadcrumb from "@/app/components/Breadcrumb";
import CampaignCardContent from "@/app/(authenticated)/campaigns/CampaignCardContent";
import CardGroup from "@/app/components/CardGroup";
import PageHeading from "@/app/components/PageHeading";
import Tabs from "@/app/components/Tabs";

function Queue() {
  const items = ["Today", "Upcoming", "Posted"];

  return (
    <>
      <Breadcrumb items={[{ title: "Queue", href: "/queue" }]} />
      <PageHeading>Queue</PageHeading>
      <Tabs items={items}>
        <Tabs.Item items={items} />
        <Tabs.Content items={items}>
          <CardGroup showCreateOption CardContent={<CampaignCardContent />} />
        </Tabs.Content>
      </Tabs>
    </>
  );
}

export default Queue;

