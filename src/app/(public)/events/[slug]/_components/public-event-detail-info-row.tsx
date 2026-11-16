import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/app/_components/ui/item";

import type { TPublicEventDetailInfoRowProps } from "@/app/(public)/events/[slug]/_types/public-event-detail-info-row-props";

// Label/value row on shadcn Item (label as the small title, value as text)
export default function PublicEventDetailInfoRow({
  icon: Icon,
  label,
  value,
}: TPublicEventDetailInfoRowProps) {
  return (
    <Item size="xs" className="items-start p-0">
      <ItemMedia className="size-9 rounded-sm border bg-muted text-muted-foreground [&_svg]:size-4">
        <Icon />
      </ItemMedia>
      <ItemContent className="min-w-0 gap-0.5">
        <ItemTitle className="text-xs tracking-wide text-muted-foreground uppercase">
          {label}
        </ItemTitle>
        <ItemDescription className="line-clamp-none text-base font-medium break-words text-foreground">
          {value}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}
