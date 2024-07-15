import Breadcrumb from "@/components/Breadcrumb";
import PageHeading from "@/components/PageHeading";
import QueueContent from "./QueueContent";
import { getActiveTweets } from "@/utils/actions";

async function Queue() {
  const tweets = await getActiveTweets();

  return (
    <>
      <Breadcrumb items={[{ title: "Queue", href: "/queue" }]} />
      <PageHeading>Queue</PageHeading>
      <QueueContent tweets={tweets} />
    </>
  );
}

export default Queue;

