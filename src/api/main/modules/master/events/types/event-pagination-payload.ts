import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";
import type { TEventSortBy } from "@/api/main/modules/master/events/consts/event-sort-by";
import type { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import type { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";

// API defaults: sort_by updated_at, order desc
export type TEventPaginationPayload = TMainApiPaginationPayload & {
  sort_by?: TEventSortBy;
  status?: EventStatusEnum;
  location_type?: EventLocationTypeEnum;
  created_by?: string;
};
