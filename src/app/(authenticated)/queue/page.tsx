import Breadcrumb from "@/components/Breadcrumb";
import CardGroup from "@/components/CardGroup";
import PageHeading from "@/components/PageHeading";
import Tabs from "@/components/Tabs";
import TweetCardContent from "../campaigns/[id]/TweetCardContent";

function Queue() {
  const items = ["Today", "Upcoming", "Posted"];

  return (
    <>
      <Breadcrumb items={[{ title: "Queue", href: "/queue" }]} />
      <PageHeading>Queue</PageHeading>
      <Tabs items={items}>
        <Tabs.Item items={items} />
        <Tabs.Content items={items}>
          <CardGroup CardContent={<TweetCardContent />} />
        </Tabs.Content>
      </Tabs>
    </>
  );
}

export default Queue;

