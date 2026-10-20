import { useTranslations } from "next-intl";

import { Badge } from "@/app/_components/ui/badge";
import { cn } from "@/utils/cn";
import { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";

import { PUBLIC_GUILDMATE_STORY_LOCATION_TYPE_ICON } from "@/app/[locale]/(public)/guildmates/[slug]/_constants/public-guildmate-story-icons";
import type { TPublicGuildmateStoryLocationBadgeProps } from "@/app/[locale]/(public)/guildmates/[slug]/_types/public-guildmate-detail-components-props";

export default function PublicGuildmateStoryLocationBadge({
  locationType,
  className,
}: TPublicGuildmateStoryLocationBadgeProps) {
  const t = useTranslations("guildmateDetail.storyCard.location");
  const Icon = PUBLIC_GUILDMATE_STORY_LOCATION_TYPE_ICON[locationType];

  return (
    <Badge
      variant="outline"
      className={cn("gap-1 rounded-sm px-2 [&>svg]:size-3", className)}
    >
      <Icon />
      {t(StoryLocationTypeEnum[locationType] as keyof typeof StoryLocationTypeEnum)}
    </Badge>
  );
}
