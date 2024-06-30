import React from "react";
import { BellIcon } from "@radix-ui/react-icons";
import { IconButton as ButtonWithIcon } from "@radix-ui/themes";

type IconButtonProps = {
  children?: React.ReactNode;
  variant?: "soft" | "ghost";
};

function IconButton({ children, variant }: IconButtonProps) {
  return (
    <ButtonWithIcon radius="full" variant={variant}>
      {children}
    </ButtonWithIcon>
  );
}

export default IconButton;

