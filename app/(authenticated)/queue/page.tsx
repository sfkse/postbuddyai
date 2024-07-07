import Breadcrumb from "@/app/components/Breadcrumb";
import CardGroup from "@/app/components/CardGroup";
import PageHeading from "@/app/components/PageHeading";
import Tabs from "@/app/components/Tabs";
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

