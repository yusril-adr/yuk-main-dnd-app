import { Badge } from "@/app/_components/ui/badge";
import { cn } from "cn";

import { BOARD_EVENT_STATUS_CLASS } from "@/app/(authenticated)/dashboard/(player-board)/events/_constants/board-event";
import type { TBoardEventStatusBadgeProps } from "@/app/(authenticated)/dashboard/(player-board)/events/_types/board-event-components-props";

export default function BoardEventStatusBadge({
  status,
  label,
  className,
}: TBoardEventStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(BOARD_EVENT_STATUS_CLASS[status], className)}
    >
      {label}
    </Badge>
  );
}
