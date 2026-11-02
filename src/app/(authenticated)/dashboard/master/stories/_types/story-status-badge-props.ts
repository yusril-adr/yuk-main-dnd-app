import type { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";

export type TStoryStatusBadgeProps = {
  status: StoryStatusEnum;
  /** When set (e.g. from the list catalog), overrides STORY_STATUS_LABEL. */
  label?: string;
};
