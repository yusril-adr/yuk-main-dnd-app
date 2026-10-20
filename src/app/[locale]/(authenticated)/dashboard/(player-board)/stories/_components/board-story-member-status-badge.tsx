import { UserCheck } from "lucide-react";

import { Badge } from "@/app/_components/ui/badge";
import { STORY_MEMBER_STATUS_LABEL } from "@/api/main/modules/master/stories/enums/story-member-status-label";
import { cn } from "@/utils/cn";

import { BOARD_STORY_MEMBER_STATUS_CLASS } from "@/app/[locale]/(authenticated)/dashboard/(player-board)/stories/_constants/board-story";
import type { TBoardStoryMemberStatusBadgeProps } from "@/app/[locale]/(authenticated)/dashboard/(player-board)/stories/_types/board-story-components-props";

// The viewer's own seat on the story
export default function BoardStoryMemberStatusBadge({
  memberStatus,
  className,
}: TBoardStoryMemberStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1",
        BOARD_STORY_MEMBER_STATUS_CLASS[memberStatus],
        className,
      )}
    >
      <UserCheck className="size-3" />
      {STORY_MEMBER_STATUS_LABEL[memberStatus]}
    </Badge>
  );
}
