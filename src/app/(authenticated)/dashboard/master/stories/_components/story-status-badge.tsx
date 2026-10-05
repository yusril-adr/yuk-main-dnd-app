import { Badge } from "@/app/_components/ui/badge";
import { toTitleCase } from "@/utils/format-text";

import { STORY_STATUS_BADGE_VARIANT } from "@/app/(authenticated)/dashboard/master/stories/_constants/story-status-badge-variant";
import type { TStoryStatusBadgeProps } from "@/app/(authenticated)/dashboard/master/stories/_types/story-status-badge-props";

export default function StoryStatusBadge({ status }: TStoryStatusBadgeProps) {
  return (
    <Badge variant={STORY_STATUS_BADGE_VARIANT[status]}>
      {toTitleCase(status)}
    </Badge>
  );
}
