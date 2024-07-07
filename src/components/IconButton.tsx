import { IconButton as ButtonWithIcon } from "@radix-ui/themes";

type IconButtonProps = {
  children?: React.ReactNode;
  variant?: "soft" | "ghost";
  radius?: "small" | "full";
};

function IconButton({ children, variant, radius = "full" }: IconButtonProps) {
  return (
    <ButtonWithIcon radius={radius} variant={variant}>
      {children}
    </ButtonWithIcon>
  );
}

export default IconButton;

