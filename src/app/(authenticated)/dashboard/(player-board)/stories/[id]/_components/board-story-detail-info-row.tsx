import { Else, If, Then } from "react-if";

import type { TBoardStoryDetailInfoRowProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_types/board-story-detail-components-props";

export default function BoardStoryDetailInfoRow({
  icon: Icon,
  label,
  value,
  emptyText,
}: TBoardStoryDetailInfoRowProps) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 size-5 shrink-0 text-primary/70" />
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <div className="mt-0.5 whitespace-pre-line break-words">
          <If condition={!!value}>
            <Then>{value}</Then>
            <Else>
              <span className="italic text-muted-foreground">{emptyText}</span>
            </Else>
          </If>
        </div>
      </div>
    </div>
  );
}
