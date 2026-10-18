import { Badge } from "@/app/_components/ui/badge";
import { cn } from "@/utils/cn";
import { STORY_TYPE_LABEL } from "@/api/main/modules/master/stories/enums/story-type-label";

import { PUBLIC_GUILDMATE_STORY_TYPE_ICON } from "@/app/(public)/guildmates/[slug]/_constants/public-guildmate-story-icons";
import type { TPublicGuildmateStoryTypeBadgeProps } from "@/app/(public)/guildmates/[slug]/_types/public-guildmate-detail-components-props";

export default function PublicGuildmateStoryTypeBadge({
  type,
  className,
}: TPublicGuildmateStoryTypeBadgeProps) {
  const Icon = PUBLIC_GUILDMATE_STORY_TYPE_ICON[type];

  return (
    <Badge
      variant="secondary"
      className={cn("gap-1 rounded-sm px-2 [&>svg]:size-3", className)}
    >
      <Icon />
      {STORY_TYPE_LABEL[type]}
    </Badge>
  );
}
