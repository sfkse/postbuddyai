import Breadcrumb from "@/components/Breadcrumb";
import PageHeading from "@/components/PageHeading";
import { getDrafts } from "@/utils/actions";
import DraftsContent from "./DraftsContent";

async function Drafts() {
  const drafts = await getDrafts();
  return (
    <>
      <Breadcrumb items={[{ title: "Drafts", href: "/drafts" }]} />
      <PageHeading>Drafts</PageHeading>
      <DraftsContent drafts={drafts} />
    </>
  );
}

export default Drafts;

