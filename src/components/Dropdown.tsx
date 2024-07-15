import { DropdownMenu, IconButton } from "@radix-ui/themes";

type DropdownProps = {
  items: {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    color?: "red" | "indigo";
  }[];
  Icon: React.ReactNode;
  color?: string;
};

function Dropdown({ items, Icon }: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost" radius="full" style={{ padding: "0.5rem" }}>
          {Icon}
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {items.map((item) => (
          <DropdownMenu.Item
            key={item.label}
            color={item.color || "indigo"}
            onClick={item.onClick}
          >
            {item.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default Dropdown;

