import { Else, If, Then } from "react-if";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/app/_components/ui/item";

import type { TBoardStoryDetailInfoRowProps } from "@/app/[locale]/(authenticated)/dashboard/(player-board)/stories/[id]/_types/board-story-detail-components-props";

export default function BoardStoryDetailInfoRow({
  icon: Icon,
  label,
  value,
  emptyText,
}: TBoardStoryDetailInfoRowProps) {
  return (
    <Item size="xs" className="flex-nowrap items-start gap-3 p-0">
      <ItemMedia className="mt-0.5 text-primary/70">
        <Icon className="size-5" />
      </ItemMedia>
      <ItemContent className="min-w-0 gap-0.5">
        <ItemDescription className="text-xs tracking-wider uppercase">
          {label}
        </ItemDescription>
        <ItemTitle className="w-full text-base font-normal break-words whitespace-pre-line">
          <If condition={!!value}>
            <Then>{value}</Then>
            <Else>
              <span className="text-muted-foreground italic">{emptyText}</span>
            </Else>
          </If>
        </ItemTitle>
      </ItemContent>
    </Item>
  );
}
