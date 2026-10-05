import { BookOpen, Swords, type LucideIcon } from "lucide-react";

import { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";

export const STORY_TYPE_ICON: Record<StoryTypeEnum, LucideIcon> = {
  [StoryTypeEnum.ONESHOT]: Swords,
  [StoryTypeEnum.CAMPAIGN]: BookOpen,
};
