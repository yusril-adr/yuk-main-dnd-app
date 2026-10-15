import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/app/_components/ui/item";
import type { TUserStatItemProps } from "@/app/(authenticated)/dashboard/master/iam/users/_types/user-stat-item-props";

// Compact label/value tile for XP and gold stats
export default function UserStatItem({
  label,
  value,
  size = "sm",
}: TUserStatItemProps) {
  return (
    <Item
      variant="muted"
      size="xs"
      className="min-w-0 flex-col items-center justify-center gap-0.5 text-center"
    >
      <ItemContent className="items-center gap-0.5">
        <ItemDescription className="text-[11px] tracking-wider uppercase">
          {label}
        </ItemDescription>
        <ItemTitle
          className={
            size === "lg"
              ? "font-heading text-lg tabular-nums"
              : "font-medium tabular-nums"
          }
        >
          {value}
        </ItemTitle>
      </ItemContent>
    </Item>
  );
}
