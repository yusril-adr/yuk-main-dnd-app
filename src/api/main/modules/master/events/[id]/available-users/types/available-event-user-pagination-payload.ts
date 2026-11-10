import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";
import type { TAvailableStoryUserSortBy } from "@/api/main/modules/master/stories/[id]/available-users/consts/available-story-user-sort-by";

// Same user columns as for stories. API defaults: sort_by updated_at, order
// asc. search matches username, display_name and email. Active members are
// already excluded.
export type TAvailableEventUserPaginationPayload = TMainApiPaginationPayload & {
  sort_by?: TAvailableStoryUserSortBy;
};
