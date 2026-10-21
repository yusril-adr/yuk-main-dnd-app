import { useTranslations } from "next-intl";

import { Badge } from "@/app/_components/ui/badge";
import { cn } from "@/utils/cn";
import { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";

import { PUBLIC_STORY_LOCATION_TYPE_ICON } from "@/app/[locale]/(public)/stories/_constants/public-story-icons";
import type { TPublicStoryLocationBadgeProps } from "@/app/[locale]/(public)/stories/_types/public-story-components-props";

export default function PublicStoryLocationBadge({
  locationType,
  className,
}: TPublicStoryLocationBadgeProps) {
  const t = useTranslations("stories.badge");
  const Icon = PUBLIC_STORY_LOCATION_TYPE_ICON[locationType];

  return (
    <Badge
      variant="outline"
      className={cn("gap-1 rounded-sm px-2 [&>svg]:size-3", className)}
    >
      <Icon />
      {t(
        `location.${StoryLocationTypeEnum[locationType] as keyof typeof StoryLocationTypeEnum}`,
      )}
    </Badge>
  );
}
