import { SignUp } from "@clerk/nextjs";
import { Flex } from "@radix-ui/themes";

export default function Page() {
  return (
    <Flex justify="center" align="center" height="80vh">
      <SignUp />
    </Flex>
  );
}

