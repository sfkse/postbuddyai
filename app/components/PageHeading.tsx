import { Heading } from "@radix-ui/themes";
import React from "react";

type PageHeadingProps = {
  children: React.ReactNode;
};

function PageHeading({ children }: PageHeadingProps) {
  return <Heading my="4">{children}</Heading>;
}

export default PageHeading;

