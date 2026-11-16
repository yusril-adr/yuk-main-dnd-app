import type { TPublicEventPaginationResponse } from "@/api/main/modules/events/types/public-event-pagination-response";
import type { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import type { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";

export type TPublicEventStatus =
  EventStatusEnum.PUBLISHED | EventStatusEnum.COMPLETED;

export type TPublicEventCardListFilters = {
  status: TPublicEventStatus | null;
  locationType: EventLocationTypeEnum | null;
};

export type TPublicEventCardListQueryTable = TPublicEventCardListFilters & {
  page: number;
  search: string;
};

export type TPublicEventCardListActionHandler = {
  onPageChange: (page: number) => void;
  onSearchChange: (value: string) => void;
  onFilterApply: (filters: TPublicEventCardListFilters) => void;
};

export type TPublicEventCardListProps = {
  data: TPublicEventPaginationResponse[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  // Clears search and every filter
  onReset: () => void;
  pageCount: number;
  rowCount: number;
  queryTable: TPublicEventCardListQueryTable;
  onActionHandler: TPublicEventCardListActionHandler;
};
