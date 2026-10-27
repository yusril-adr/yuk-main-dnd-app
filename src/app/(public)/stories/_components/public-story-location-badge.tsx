import { Badge } from "@/app/_components/ui/badge";
import { cn } from "cn";
import { STORY_LOCATION_TYPE_LABEL } from "@/api/main/modules/master/stories/enums/story-location-type-label";

import { PUBLIC_STORY_LOCATION_TYPE_ICON } from "@/app/(public)/stories/_constants/public-story-icons";
import type { TPublicStoryLocationBadgeProps } from "@/app/(public)/stories/_types/public-story-components-props";

export default function PublicStoryLocationBadge({
  locationType,
  className,
}: TPublicStoryLocationBadgeProps) {
  const Icon = PUBLIC_STORY_LOCATION_TYPE_ICON[locationType];

  return (
    <Badge
      variant="outline"
      className={cn("gap-1 rounded-sm px-2 [&>svg]:size-3", className)}
    >
      <Icon />
      {STORY_LOCATION_TYPE_LABEL[locationType]}
    </Badge>
  );
}
