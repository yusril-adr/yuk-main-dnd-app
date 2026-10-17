import { Badge } from "@/app/_components/ui/badge";
import { cn } from "@/utils/cn";
import { STORY_LOCATION_TYPE_LABEL } from "@/api/main/modules/master/stories/enums/story-location-type-label";

import { PUBLIC_GUILDMATE_STORY_LOCATION_TYPE_ICON } from "@/app/(public)/guildmates/[slug]/_constants/public-guildmate-story-icons";
import type { TPublicGuildmateStoryLocationBadgeProps } from "@/app/(public)/guildmates/[slug]/_types/public-guildmate-detail-components-props";

export default function PublicGuildmateStoryLocationBadge({
  locationType,
  className,
}: TPublicGuildmateStoryLocationBadgeProps) {
  const Icon = PUBLIC_GUILDMATE_STORY_LOCATION_TYPE_ICON[locationType];

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
