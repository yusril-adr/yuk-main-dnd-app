import { Diamond } from "lucide-react";

import { Badge } from "@/app/_components/ui/badge";
import { cn } from "cn";
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";

import type { TPublicStoryStatusBadgeProps } from "@/app/(public)/stories/_types/public-story-components-props";

export default function PublicStoryStatusBadge({
  status,
  label,
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
      {label}
    </Badge>
  );
}
