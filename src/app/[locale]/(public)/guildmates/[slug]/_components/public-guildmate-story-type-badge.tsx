import { useTranslations } from "next-intl";

import { Badge } from "@/app/_components/ui/badge";
import { cn } from "@/utils/cn";
import { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";

import { PUBLIC_GUILDMATE_STORY_TYPE_ICON } from "@/app/[locale]/(public)/guildmates/[slug]/_constants/public-guildmate-story-icons";
import type { TPublicGuildmateStoryTypeBadgeProps } from "@/app/[locale]/(public)/guildmates/[slug]/_types/public-guildmate-detail-components-props";

export default function PublicGuildmateStoryTypeBadge({
  type,
  className,
}: TPublicGuildmateStoryTypeBadgeProps) {
  const t = useTranslations("guildmateDetail.storyCard.type");
  const Icon = PUBLIC_GUILDMATE_STORY_TYPE_ICON[type];

  return (
    <Badge
      variant="secondary"
      className={cn("gap-1 rounded-sm px-2 [&>svg]:size-3", className)}
    >
      <Icon />
      {t(StoryTypeEnum[type] as keyof typeof StoryTypeEnum)}
    </Badge>
  );
}
