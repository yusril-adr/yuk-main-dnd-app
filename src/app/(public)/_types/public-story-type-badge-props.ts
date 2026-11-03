import type { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";

export type TPublicStoryTypeBadgeProps = {
  type: StoryTypeEnum;
  label: string;
  className?: string;
};
