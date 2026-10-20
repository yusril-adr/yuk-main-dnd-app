import { Diamond } from "lucide-react";

import { Badge } from "@/app/_components/ui/badge";
import { cn } from "@/utils/cn";
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { STORY_STATUS_LABEL } from "@/api/main/modules/master/stories/enums/story-status-label";

import type { TPublicStoryStatusBadgeProps } from "@/app/[locale]/(public)/stories/_types/public-story-components-props";

export default function PublicStoryStatusBadge({
  status,
  className,
}: TPublicStoryStatusBadgeProps) {
  const isOpen = status === StoryStatusEnum.PUBLISHED;

  return (
    <Badge
      variant={isOpen ? "default" : "outline"}
      className={cn(
        "gap-1 rounded-sm px-2 shadow-none [&>svg]:size-2.5 [&>svg]:fill-current",
        !isOpen && "bg-background text-muted-foreground",
        className,
      )}
    >
      <Diamond aria-hidden />
      {isOpen ? "Recruiting" : STORY_STATUS_LABEL[status]}
    </Badge>
  );
}
