import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";
import type { TPublicStorySortBy } from "@/api/main/modules/stories/consts/public-story-sort-by";
import type { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import type { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import type { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";

export type TPublicStoryPaginationPayload = TMainApiPaginationPayload & {
  sort_by?: TPublicStorySortBy;
  // Only PUBLISHED or COMPLETED; the API returns both when omitted
  status?: StoryStatusEnum.PUBLISHED | StoryStatusEnum.COMPLETED;
  type?: StoryTypeEnum;
  location_type?: StoryLocationTypeEnum;
  created_by?: string;
};
