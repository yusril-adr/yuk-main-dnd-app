import type { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";

export type TPublicStoryStatusBadgeProps = {
  status: StoryStatusEnum;
  label: string;
  className?: string;
};
