import { Badge } from "@/app/_components/ui/badge";

import { STORY_STATUS_BADGE_VARIANT } from "@/app/(authenticated)/dashboard/master/stories/_constants/story-status-badge-variant";
import { STORY_STATUS_LABEL } from "@/api/main/modules/master/stories/enums/story-status-label";
import type { TStoryStatusBadgeProps } from "@/app/(authenticated)/dashboard/master/stories/_types/story-status-badge-props";

export default function StoryStatusBadge({ status }: TStoryStatusBadgeProps) {
  return (
    <Badge variant={STORY_STATUS_BADGE_VARIANT[status]}>
      {STORY_STATUS_LABEL[status]}
    </Badge>
  );
}
