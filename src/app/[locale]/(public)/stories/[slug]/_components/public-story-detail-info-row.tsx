import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/app/_components/ui/item";

import type { TPublicStoryDetailInfoRowProps } from "@/app/[locale]/(public)/stories/[slug]/_types/public-story-detail-components-props";

// Label/value row on shadcn Item (label as the small title, value as text)
export default function PublicStoryDetailInfoRow({
  icon: Icon,
  label,
  value,
}: TPublicStoryDetailInfoRowProps) {
  return (
    <Item size="xs" className="items-start p-0">
      <ItemMedia className="size-9 rounded-sm border bg-muted text-muted-foreground [&_svg]:size-4">
        <Icon />
      </ItemMedia>
      <ItemContent className="min-w-0 gap-0.5">
        <ItemTitle className="text-xs tracking-wide text-muted-foreground uppercase">
          {label}
        </ItemTitle>
        <ItemDescription className="line-clamp-none text-sm font-medium break-words text-foreground">
          {value}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}
