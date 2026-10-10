import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";
import type { TAvailableStoryUserSortBy } from "../consts/available-story-user-sort-by";

// Omitting order uses the API default asc. Omitting sort_by uses updated_at.
// search matches username, display_name, and email.
// The API already excludes the story creator and active members.
export type TAvailableStoryUserPaginationPayload =
  TMainApiPaginationPayload & {
    sort_by?: TAvailableStoryUserSortBy;
  };
