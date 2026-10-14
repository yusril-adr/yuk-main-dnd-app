import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/app/_components/ui/card";
import { cn } from "@/utils/cn";

import BoardStoryDetailOrnament from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-ornament";
import type { TBoardStoryDetailSectionCardProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_types/board-story-detail-components-props";

export default function BoardStoryDetailSectionCard({
  icon: Icon,
  title,
  className,
  action,
  children,
}: TBoardStoryDetailSectionCardProps) {
  return (
    <Card className={cn("border-2 border-primary/15", className)}>
      <CardHeader>
        <h3
          data-slot="card-title"
          className="flex items-center gap-2 font-heading text-lg leading-normal font-medium"
        >
          <span
            aria-hidden="true"
            className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary"
          >
            <Icon className="size-4" />
          </span>
          {title}
        </h3>
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <BoardStoryDetailOrnament />
        {children}
      </CardContent>
    </Card>
  );
}
