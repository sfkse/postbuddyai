import { Flex, Spinner } from "@radix-ui/themes";

function Loading() {
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Spinner size="3" />
    </Flex>
  );
}

export default Loading;

