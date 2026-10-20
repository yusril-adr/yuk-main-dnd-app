import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";

// The public API only returns (and only accepts as a filter) these statuses
export const PUBLIC_STORY_STATUS_OPTIONS = [
  StoryStatusEnum.PUBLISHED,
  StoryStatusEnum.COMPLETED,
] as const;
