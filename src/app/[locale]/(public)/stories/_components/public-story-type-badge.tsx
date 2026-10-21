import { useTranslations } from "next-intl";

import { Badge } from "@/app/_components/ui/badge";
import { cn } from "@/utils/cn";
import { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";

import { PUBLIC_STORY_TYPE_ICON } from "@/app/[locale]/(public)/stories/_constants/public-story-icons";
import type { TPublicStoryTypeBadgeProps } from "@/app/[locale]/(public)/stories/_types/public-story-components-props";

export default function PublicStoryTypeBadge({
  type,
  className,
}: TPublicStoryTypeBadgeProps) {
  const t = useTranslations("stories.badge");
  const Icon = PUBLIC_STORY_TYPE_ICON[type];

  return (
    <Badge
      variant="secondary"
      className={cn("gap-1 rounded-sm px-2 [&>svg]:size-3", className)}
    >
      <Icon />
      {t(`type.${StoryTypeEnum[type] as keyof typeof StoryTypeEnum}`)}
    </Badge>
  );
}
