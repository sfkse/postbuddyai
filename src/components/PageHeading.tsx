import { Heading } from "@radix-ui/themes";

type PageHeadingProps = {
  children: React.ReactNode;
};

function PageHeading({ children }: PageHeadingProps) {
  return <Heading my="4">{children}</Heading>;
}

export default PageHeading;

