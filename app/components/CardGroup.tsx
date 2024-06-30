import Link from "next/link";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Card as CardComponent,
  Box,
  Heading,
  Text,
  Strong,
  Tooltip,
  Flex,
  Grid,
  IconButton,
} from "@radix-ui/themes";
import Badge from "@/app/components/Badge";
import Dropdown from "@/app/components/Dropdown";

type CardGroupProps = {
  showCreateOption?: boolean;
};

function CardGroup({ showCreateOption = false }: CardGroupProps) {
  return (
    <Grid mt="8" gap="4" columns="repeat(auto-fill,minmax(250px, 1fr)">
      <CardComponent variant="classic" asChild style={{ padding: "1.25rem" }}>
        <Link href="campaigns/development">
          <Flex justify="between" align="center">
            <Heading size="4" weight="bold" mb="2">
              Development
            </Heading>
            <Dropdown />
          </Flex>
          <Box
            style={{
              color: "var(--secondary-light)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "block",
              width: "100%",
              marginTop: "0.5rem",
            }}
          >
            <Tooltip content="React, Next.js, Tailwind CSS">
              <Text as="span" size="2">
                <Strong>Topics:</Strong> React, Next.js, Tailwind CSS
              </Text>
            </Tooltip>
          </Box>
          <Box style={{ color: "var(--secondary-light)" }}>
            <Text as="span" size="2">
              <Strong>Tweets:</Strong> 5/10
            </Text>
          </Box>
          <Box style={{ color: "var(--secondary-light)" }}>
            <Text as="span" size="2">
              <Strong>Created:</Strong> 2 days ago
            </Text>
          </Box>
          <Badge color="orange" text="In progress" />
        </Link>
      </CardComponent>
      {showCreateOption && (
        <CardComponent
          variant="classic"
          asChild
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a href="#">
            <IconButton radius="full" variant="soft">
              <PlusIcon width="18" height="18" />
            </IconButton>
          </a>
        </CardComponent>
      )}
    </Grid>
  );
}

export default CardGroup;

