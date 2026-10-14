import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";
import type { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import type { StoryMemberStatusEnum } from "@/api/main/modules/master/stories/enums/story-member-status";
import type { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import type { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";

// No sort: the API always orders by story created_at desc
export type TBoardStoryPaginationPayload = Omit<
  TMainApiPaginationPayload,
  "sort_by" | "order"
> & {
  status?: StoryStatusEnum;
  // The caller's own member status on the story
  member_status?: StoryMemberStatusEnum;
  type?: StoryTypeEnum;
  location_type?: StoryLocationTypeEnum;
  created_by?: string;
};
