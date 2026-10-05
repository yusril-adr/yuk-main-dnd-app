import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";
import type { TStorySortBy } from "@/api/main/modules/master/stories/consts/story-sort-by";
import type { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import type { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import type { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";

export type TStoryPaginationPayload = TMainApiPaginationPayload & {
  sort_by?: TStorySortBy;
  status?: StoryStatusEnum;
  type?: StoryTypeEnum;
  location_type?: StoryLocationTypeEnum;
  created_by?: string;
};
