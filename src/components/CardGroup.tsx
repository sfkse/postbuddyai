import Link from "next/link";
import { DotsVerticalIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Card as CardComponent,
  Heading,
  Flex,
  IconButton,
} from "@radix-ui/themes";
import Dropdown from "./Dropdown";

type CardGroupProps = {
  dropdownItems?: {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    color?: "red" | "indigo";
  }[];
  href?: string;
  CardContent?: React.ReactNode;
  cardTitle?: string;
  createType?: boolean;
  toggleSlideScreen?: (value: boolean) => void;
};

function CardGroup({
  dropdownItems,
  CardContent,
  cardTitle,
  href,
  toggleSlideScreen,
  createType = false,
}: CardGroupProps) {
  return (
    <>
      {createType ? (
        <CardComponent
          variant="classic"
          asChild
          onClick={() => toggleSlideScreen?.(true)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
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
      ) : (
        <CardComponent variant="classic" asChild style={{ padding: "1.25rem" }}>
          <Link href={href || "#"}>
            <Flex justify="between" align="center">
              <Heading size="4" weight="bold" mb="2">
                {cardTitle}
              </Heading>

              {dropdownItems && (
                <Dropdown
                  items={dropdownItems || []}
                  Icon={<DotsVerticalIcon />}
                />
              )}
            </Flex>
            {CardContent}
          </Link>
        </CardComponent>
      )}
    </>
  );
}

export default CardGroup;

