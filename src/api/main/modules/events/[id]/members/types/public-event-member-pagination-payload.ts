import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";
import type { TPublicEventMemberSortBy } from "../consts/public-event-member-sort-by";
import type { EventMemberStatusEnum } from "@/api/main/modules/master/events/enums/event-member-status";

// API defaults: sort_by updated_at, order asc. search matches the member's
// username and display_name.
export type TPublicEventMemberPaginationPayload = TMainApiPaginationPayload & {
  sort_by?: TPublicEventMemberSortBy;
  status?: EventMemberStatusEnum;
};
