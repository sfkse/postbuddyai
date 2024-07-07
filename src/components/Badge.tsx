import { Badge as BadgeComponent } from "@radix-ui/themes";

type BadgeProps = {
  color: "green" | "orange" | "red";
  text: string;
};

function Badge({ color, text }: BadgeProps) {
  return <BadgeComponent color={color}>{text}</BadgeComponent>;
}

export default Badge;

