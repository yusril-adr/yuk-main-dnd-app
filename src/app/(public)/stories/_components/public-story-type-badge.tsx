import { Badge } from "@/app/_components/ui/badge";
import { cn } from "cn";

import { PUBLIC_STORY_TYPE_ICON } from "@/app/(public)/stories/_constants/public-story-icons";
import type { TPublicStoryTypeBadgeProps } from "@/app/(public)/stories/_types/public-story-components-props";

export default function PublicStoryTypeBadge({
  type,
  label,
  className,
}: TPublicStoryTypeBadgeProps) {
  const Icon = PUBLIC_STORY_TYPE_ICON[type];

  return (
    <Badge
      variant="secondary"
      className={cn("gap-1 rounded-sm px-2 [&>svg]:size-3", className)}
    >
      <Icon />
      {label}
    </Badge>
  );
}
