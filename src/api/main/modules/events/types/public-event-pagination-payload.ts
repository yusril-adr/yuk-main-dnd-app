import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";
import type { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import type { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";

// No sort: the API orders by created_at desc. search matches the title
export type TPublicEventPaginationPayload = Omit<
  TMainApiPaginationPayload,
  "sort_by" | "order"
> & {
  // Only PUBLISHED or COMPLETED; the API returns both when omitted
  status?: EventStatusEnum.PUBLISHED | EventStatusEnum.COMPLETED;
  location_type?: EventLocationTypeEnum;
  created_by?: string;
};
