import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";
import type { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import type { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";
import type { TPublicUserJoinedEventSortBy } from "../consts/public-user-joined-event-sort-by";

// Unlike joined stories this one sorts: defaults sort_by updated_at, order desc
export type TPublicUserJoinedEventPaginationPayload =
  TMainApiPaginationPayload & {
    sort_by?: TPublicUserJoinedEventSortBy;
    // Only PUBLISHED or COMPLETED; the API returns both when omitted
    status?: EventStatusEnum.PUBLISHED | EventStatusEnum.COMPLETED;
    location_type?: EventLocationTypeEnum;
  };
