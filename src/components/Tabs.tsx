import { Tabs as TabsComponent, Text } from "@radix-ui/themes";

type TabsProps = {
  children: React.ReactNode;
  items: string[];
};

type TabItemProps = {
  items: string[];
};

type TabContentProps = {
  children: React.ReactNode;
  items: string[];
};

function Tabs({ children, items }: TabsProps) {
  return (
    <TabsComponent.Root defaultValue={items[0].toLowerCase()}>
      {children}
    </TabsComponent.Root>
  );
}

function TabItem({ items }: TabItemProps) {
  return (
    <TabsComponent.List>
      {items.map((item) => (
        <TabsComponent.Trigger key={item} value={item.toLowerCase()}>
          <Text key={item} as="span" size="2">
            {item}
          </Text>
        </TabsComponent.Trigger>
      ))}
    </TabsComponent.List>
  );
}

function TabContent({ children, items }: TabContentProps) {
  return (
    <>
      {items.map((item) => (
        <TabsComponent.Content key={item} value={item.toLowerCase()}>
          {children}
        </TabsComponent.Content>
      ))}
    </>
  );
}

Tabs.Item = TabItem;
Tabs.Content = TabContent;

export default Tabs;

