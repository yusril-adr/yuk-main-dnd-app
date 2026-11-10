import type { TPublicEventPaginationResponse } from "@/api/main/modules/events/types/public-event-pagination-response";
import type { EventMemberStatusEnum } from "@/api/main/modules/master/events/enums/event-member-status";

// Events the caller is a member of, with their own member status
export type TBoardEventPaginationResponse = TPublicEventPaginationResponse & {
  member_status: EventMemberStatusEnum;
};
