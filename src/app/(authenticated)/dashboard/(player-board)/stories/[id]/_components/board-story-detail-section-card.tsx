import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { cn } from "cn";

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
        <CardTitle
          role="heading"
          aria-level={3}
          className="flex items-center gap-2 font-heading text-lg"
        >
          <Avatar aria-hidden className="size-8 after:hidden">
            <AvatarFallback className="bg-primary/10 text-primary">
              <Icon className="size-4" />
            </AvatarFallback>
          </Avatar>
          {title}
        </CardTitle>
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <BoardStoryDetailOrnament />
        {children}
      </CardContent>
    </Card>
  );
}
