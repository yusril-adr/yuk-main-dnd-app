import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { cn } from "cn";

import BoardEventDetailOrnament from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_components/board-event-detail-ornament";
import type { TBoardEventDetailSectionCardProps } from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_types/board-event-detail-components-props";

export default function BoardEventDetailSectionCard({
  icon: Icon,
  title,
  className,
  action,
  children,
}: TBoardEventDetailSectionCardProps) {
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
        <BoardEventDetailOrnament />
        {children}
      </CardContent>
    </Card>
  );
}
