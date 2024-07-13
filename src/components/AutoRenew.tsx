import { MagicWandIcon } from "@radix-ui/react-icons";
import { Flex, Switch, Text, Tooltip } from "@radix-ui/themes";

function AutoRenew({ children }: { children: React.ReactNode }) {
  return (
    <Flex justify="between" align="center" gap="2">
      <Tooltip
        content="Automatically renew the campaign with AI-generated content. 3 new tweets will be created after the campaign ends. 
        You can edit or delete them before the campaign starts."
      >
        <MagicWandIcon />
      </Tooltip>
      {children}
      <Text>Auto-renew</Text>
    </Flex>
  );
}

export default AutoRenew;

