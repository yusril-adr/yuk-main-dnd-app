import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";
import type { TStoryMemberSortBy } from "../consts/story-member-sort-by";
import type { StoryMemberStatusEnum } from "@/api/main/modules/master/stories/enums/story-member-status";

// Omitting order uses the API default asc, not the stories-list default desc.
// Omitting sort_by uses updated_at. search matches the member's username, display_name, and email.
export type TStoryMemberPaginationPayload = TMainApiPaginationPayload & {
  sort_by?: TStoryMemberSortBy;
  status?: StoryMemberStatusEnum;
};
