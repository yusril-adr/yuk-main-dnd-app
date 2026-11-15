import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";
import type { TAvailableEventUserSortBy } from "../consts/available-event-user-sort-by";

// Omitting order uses the API default asc. Omitting sort_by uses updated_at.
// search matches username, display_name, and email.
// The API already excludes active members.
export type TAvailableEventUserPaginationPayload = TMainApiPaginationPayload & {
  sort_by?: TAvailableEventUserSortBy;
};
