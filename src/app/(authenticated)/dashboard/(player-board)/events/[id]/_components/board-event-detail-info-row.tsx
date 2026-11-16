import { Else, If, Then } from "react-if";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/app/_components/ui/item";

import type { TBoardEventDetailInfoRowProps } from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_types/board-event-detail-components-props";

export default function BoardEventDetailInfoRow({
  icon: Icon,
  label,
  value,
  emptyText,
}: TBoardEventDetailInfoRowProps) {
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
