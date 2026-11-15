import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";
import type { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import type { EventMemberStatusEnum } from "@/api/main/modules/master/events/enums/event-member-status";
import type { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";

// No sort: the API orders by event created_at desc. search matches the title
export type TBoardEventPaginationPayload = Omit<
  TMainApiPaginationPayload,
  "sort_by" | "order"
> & {
  status?: EventStatusEnum;
  // The caller's own member status on the event
  member_status?: EventMemberStatusEnum;
  location_type?: EventLocationTypeEnum;
  created_by?: string;
};
