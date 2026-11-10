import type { TPublicEventPaginationResponse } from "@/api/main/modules/events/types/public-event-pagination-response";
import type { EventMemberStatusEnum } from "@/api/main/modules/master/events/enums/event-member-status";

// Joined events also carry the guildmate's membership status in that event
export type TPublicUserJoinedEventPaginationResponse =
  TPublicEventPaginationResponse & {
    member_status: EventMemberStatusEnum;
  };
