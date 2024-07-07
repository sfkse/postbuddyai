import { Box, Text } from "@radix-ui/themes";
import Link from "next/link";

type BreadcrumbItem = {
  items: {
    title: string;
    href: string;
  }[];
};

function Breadcrumb({ items }: BreadcrumbItem) {
  return (
    <Box style={{ color: "var(--secondary-light)" }}>
      <Text>
        {items.map((item, index) => (
          <Link key={item.title} href={item.href}>{`${item.title} ${
            items.length > 0 && "/ "
          }`}</Link>
        ))}
      </Text>
    </Box>
  );
}

export default Breadcrumb;

