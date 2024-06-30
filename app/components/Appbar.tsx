import { BellIcon } from "@radix-ui/react-icons";
import { Box, Flex } from "@radix-ui/themes";
import React from "react";
import IconButton from "./IconButton";

function Appbar() {
  return (
    <Flex
      justify="end"
      align="center"
      width="100%"
      p="3"
      style={{ borderBottom: "1px solid var(--tertiary)" }}
    >
      <IconButton variant="ghost">
        <BellIcon width="18" height="18" />
      </IconButton>
    </Flex>
  );
}

export default Appbar;

