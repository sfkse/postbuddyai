"use client";

import { Box, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathName = usePathname();

  return (
    <Flex direction="column" width={{ md: "20vw" }} height="100vh">
      <Box
        p="5"
        height="100%"
        style={{
          backgroundColor: "var(--tertiary)",
          color: "var(--primary-light)",
        }}
      >
        <Text as="p" size="6" align="center" mt="3" weight="bold">
          Post Buddy
        </Text>
        <Box mt="5">
          <Link
            href="/"
            style={{
              padding: "0.7rem",
              display: "block",
              borderRadius: "0.3rem",
              fontSize: "1.1rem",
            }}
            className={pathName === "/" ? "active" : ""}
          >
            Dashboard
          </Link>
          <Link
            href="/campaigns"
            style={{
              padding: "0.7rem",
              display: "block",
              borderRadius: "0.3rem",
              fontSize: "1.1rem",
            }}
            className={pathName === "/campaigns" ? "active" : ""}
          >
            Campaigns
          </Link>
          <Link
            href="/"
            style={{
              padding: "0.7rem",
              display: "block",
              borderRadius: "0.3rem",
              fontSize: "1.1rem",
            }}
            className={pathName === "/" ? "active" : ""}
          >
            Dashboard
          </Link>
        </Box>
      </Box>
    </Flex>
  );
}

export default Sidebar;

