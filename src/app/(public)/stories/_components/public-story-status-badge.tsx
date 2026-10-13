import { Badge } from "@/app/_components/ui/badge";
import { cn } from "@/utils/cn";
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { STORY_STATUS_LABEL } from "@/api/main/modules/master/stories/enums/story-status-label";

import type { TPublicStoryStatusBadgeProps } from "@/app/(public)/stories/_types/public-story-components-props";

export default function PublicStoryStatusBadge({
  status,
  className,
}: TPublicStoryStatusBadgeProps) {
  const isOpen = status === StoryStatusEnum.PUBLISHED;

  return (
    <Badge
      variant={isOpen ? "default" : "outline"}
      className={cn(
        "gap-1.5 rounded-sm px-2 shadow-none",
        !isOpen && "bg-background text-muted-foreground",
        className,
      )}
    >
      <span
        className={cn(
          "size-1.5 rotate-45",
          isOpen ? "bg-primary-foreground" : "bg-muted-foreground",
        )}
      />
      {isOpen ? "Recruiting" : STORY_STATUS_LABEL[status]}
    </Badge>
  );
}
