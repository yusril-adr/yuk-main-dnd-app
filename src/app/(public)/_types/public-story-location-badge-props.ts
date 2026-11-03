import type { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";

export type TPublicStoryLocationBadgeProps = {
  locationType: StoryLocationTypeEnum;
  label: string;
  className?: string;
};
