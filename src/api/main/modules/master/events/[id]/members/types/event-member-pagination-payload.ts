import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";
import type { TEventMemberSortBy } from "../consts/event-member-sort-by";
import type { EventMemberStatusEnum } from "@/api/main/modules/master/events/enums/event-member-status";

// API defaults: sort_by updated_at, order asc; status desc is always applied
// first. search matches the member's username, display_name and email.
export type TEventMemberPaginationPayload = TMainApiPaginationPayload & {
  sort_by?: TEventMemberSortBy;
  status?: EventMemberStatusEnum;
};
