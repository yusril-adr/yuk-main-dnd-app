import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";

export const STORY_STATUS_BADGE_VARIANT: Record<
  StoryStatusEnum,
  "default" | "secondary" | "outline"
> = {
  [StoryStatusEnum.PUBLISHED]: "default",
  [StoryStatusEnum.DRAFT]: "secondary",
  [StoryStatusEnum.ARCHIVED]: "outline",
};
