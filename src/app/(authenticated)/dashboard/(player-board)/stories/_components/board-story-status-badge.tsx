import { Badge } from "@/app/_components/ui/badge";
import { STORY_STATUS_LABEL } from "@/api/main/modules/master/stories/enums/story-status-label";
import { cn } from "cn";

import { BOARD_STORY_STATUS_CLASS } from "@/app/(authenticated)/dashboard/(player-board)/stories/_constants/board-story";
import type { TBoardStoryStatusBadgeProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/_types/board-story-components-props";

export default function BoardStoryStatusBadge({
  status,
  className,
}: TBoardStoryStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(BOARD_STORY_STATUS_CLASS[status], className)}
    >
      {STORY_STATUS_LABEL[status]}
    </Badge>
  );
}
