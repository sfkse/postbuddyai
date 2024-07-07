import Breadcrumb from "@/src/components/Breadcrumb";
import CardGroup from "@/src/components/CardGroup";
import PageHeading from "@/src/components/PageHeading";
import Tabs from "@/src/components/Tabs";
import TweetCardContent from "../campaigns/[slug]/TweetCardContent";

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

