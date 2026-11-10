import type { OrderKeyEnum } from "@/common/enums/order-key";
import type { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import type { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";
import type { TEventCardListSortBy } from "./event-card-list-sort-by";

export type TEventCardListFilters = {
  sortBy: TEventCardListSortBy | null;
  order: OrderKeyEnum | null;
  status: EventStatusEnum | null;
  locationType: EventLocationTypeEnum | null;
  createdBy: string | null;
};
