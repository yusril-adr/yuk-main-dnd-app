import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";
import type { TPublicStoryMemberSortBy } from "../consts/public-story-member-sort-by";
import type { StoryMemberStatusEnum } from "@/api/main/modules/master/stories/enums/story-member-status";

// API defaults: sort_by updated_at, order asc. search matches the member's
// username, display_name and email.
export type TPublicStoryMemberPaginationPayload = TMainApiPaginationPayload & {
  sort_by?: TPublicStoryMemberSortBy;
  status?: StoryMemberStatusEnum;
};
