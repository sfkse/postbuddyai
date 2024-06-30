import Breadcrumb from "@/app/components/Breadcrumb";
import CardGroup from "@/app/components/CardGroup";
import PageHeading from "@/app/components/PageHeading";
import { Tabs, Text } from "@radix-ui/themes";

function Campaigns() {
  return (
    <>
      <Breadcrumb items={[{ title: "Campaigns", href: "/campaigns" }]} />
      <PageHeading>Campaigns</PageHeading>
      <Tabs.Root defaultValue="overview">
        <Tabs.List>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="flow">Flow</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="overview">
          <CardGroup showCreateOption />
        </Tabs.Content>

        <Tabs.Content value="flow">
          <Text size="2">Access and update your documents.</Text>
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}

export default Campaigns;

