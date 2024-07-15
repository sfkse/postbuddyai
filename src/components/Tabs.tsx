import { TabNav as TabsComponent } from "@radix-ui/themes";
import Link from "next/link";

type TabsProps = {
  children: React.ReactNode;
};

type TabItemProps = {
  items: { title: string; href: string }[];
  selected: string;
};

type TabContentProps = {
  children: React.ReactNode;
  items: string[];
};

function Tabs({ children }: TabsProps) {
  return <TabsComponent.Root>{children}</TabsComponent.Root>;
}

function TabItem({ items, selected }: TabItemProps) {
  return (
    <>
      {items.map((item) => (
        <TabsComponent.Link
          asChild
          key={item.title}
          // href={item.href}
          active={item.title.toLowerCase() === selected}
        >
          <Link href={item.href}>{item.title}</Link>
        </TabsComponent.Link>
      ))}
    </>
  );
}

function TabContent({ children, items }: TabContentProps) {
  return (
    <>
      {/* {items.map((item) => ( */}
      {/* <TabsComponent.Content key={item} value={item.toLowerCase()}> */}
      {children}
      {/* </TabsComponent.Content> */}
      {/* ))} */}
    </>
  );
}

Tabs.Item = TabItem;
Tabs.Content = TabContent;

export default Tabs;

