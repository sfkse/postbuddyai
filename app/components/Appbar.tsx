import { BellIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";

import IconButton from "./IconButton";
import { SignedIn, UserButton } from "@clerk/nextjs";

function Appbar() {
  const items = [{ label: "Settings" }, { label: "Logout" }];
  return (
    <Flex
      justify="end"
      align="center"
      width="100%"
      py="4"
      p="5"
      gap="3"
      style={{ borderBottom: "1px solid var(--tertiary-light)" }}
    >
      <IconButton variant="ghost">
        <BellIcon width="15" height="15" />
      </IconButton>
      <SignedIn>
        <UserButton />
        {/* <Dropdown items={items} Icon={<PersonIcon />} /> */}
      </SignedIn>
    </Flex>
  );
}

export default Appbar;

