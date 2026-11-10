import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";
import type { TPublicEventMemberSortBy } from "@/api/main/modules/events/[id]/members/consts/public-event-member-sort-by";

// API defaults: sort_by updated_at, order asc; status desc is always applied
// first. search matches username, display_name and email. No status filter
export type TBoardEventMemberPaginationPayload = TMainApiPaginationPayload & {
  sort_by?: TPublicEventMemberSortBy;
};
