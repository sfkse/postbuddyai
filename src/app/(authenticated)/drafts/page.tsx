import Breadcrumb from "@/components/Breadcrumb";
import PageHeading from "@/components/PageHeading";
import { getDrafts, getUser } from "@/utils/actions";
import DraftsContent from "./DraftsContent";
import { User } from "@prisma/client";
import ConnectTwitter from "@/components/ConnectTwitter";
import { TweetsWithCampaignName } from "@/utils/types";

async function Drafts() {
  const user = (await getUser()) as User | null;

  if (user && !user.isTwitterConnected) {
    return <ConnectTwitter />;
  }

  const drafts = (await getDrafts()) as TweetsWithCampaignName[];

  return (
    <>
      <Breadcrumb items={[{ title: "Drafts", href: "/drafts" }]} />
      <PageHeading>Drafts</PageHeading>
      <DraftsContent drafts={drafts} />
    </>
  );
}

export default Drafts;

