import { UserCheck } from "lucide-react";

import { Badge } from "@/app/_components/ui/badge";
import { cn } from "cn";

import { BOARD_EVENT_MEMBER_STATUS_CLASS } from "@/app/(authenticated)/dashboard/(player-board)/events/_constants/board-event";
import type { TBoardEventMemberStatusBadgeProps } from "@/app/(authenticated)/dashboard/(player-board)/events/_types/board-event-components-props";

// The viewer's own seat on the event
export default function BoardEventMemberStatusBadge({
  memberStatus,
  label,
  className,
}: TBoardEventMemberStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1",
        BOARD_EVENT_MEMBER_STATUS_CLASS[memberStatus],
        className,
      )}
    >
      <UserCheck className="size-3" />
      {label}
    </Badge>
  );
}
