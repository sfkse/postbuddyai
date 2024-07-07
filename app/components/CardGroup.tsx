"use client";

import Link from "next/link";
import { DotsVerticalIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Card as CardComponent,
  Heading,
  Flex,
  Grid,
  IconButton,
} from "@radix-ui/themes";
import Dropdown from "@/app/components/Dropdown";

type CardGroupProps = {
  CardContent: React.ReactNode;
  showCreateOption?: boolean;
  setIsSlideScreenOpen?: (value: boolean) => void;
};

function CardGroup({
  showCreateOption = false,
  CardContent,
  setIsSlideScreenOpen,
}: CardGroupProps) {
  const items = [{ label: "Edit" }, { label: "Delete", color: "red" }];
  return (
    <Grid mt="8" gap="4" columns="repeat(auto-fill,minmax(250px, 1fr)">
      <CardComponent variant="classic" asChild style={{ padding: "1.25rem" }}>
        <Link href="/campaigns/development">
          <Flex justify="between" align="center">
            <Heading size="4" weight="bold" mb="2">
              Development
            </Heading>
            <Dropdown items={items} Icon={<DotsVerticalIcon />} />
          </Flex>
          {CardContent}
        </Link>
      </CardComponent>
      {showCreateOption && (
        <CardComponent
          variant="classic"
          asChild
          onClick={() => setIsSlideScreenOpen?.(true)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link href="#">
            <IconButton
              style={{ cursor: "pointer" }}
              radius="full"
              variant="soft"
            >
              <PlusIcon width="18" height="18" />
            </IconButton>
          </Link>
        </CardComponent>
      )}
    </Grid>
  );
}

export default CardGroup;

