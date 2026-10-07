import { StoryStatusEnum } from "./story-status";

export const STORY_STATUS_LABEL: Record<StoryStatusEnum, string> = {
  [StoryStatusEnum.DRAFT]: "Draft",
  [StoryStatusEnum.PUBLISHED]: "Published",
  [StoryStatusEnum.ARCHIVED]: "Archived",
};