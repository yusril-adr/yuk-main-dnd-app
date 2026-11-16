import type { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import type { EventMemberStatusEnum } from "@/api/main/modules/master/events/enums/event-member-status";
import type { TBoardEventPaginationResponse } from "@/api/main/modules/board/events/types/board-event-pagination-response";

export type TBoardEventFilterValues = {
  status: EventStatusEnum | null;
  memberStatus: EventMemberStatusEnum | null;
};

export type TBoardEventFiltersProps = TBoardEventFilterValues & {
  search: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: TBoardEventFilterValues) => void;
};

export type TBoardEventCardProps = {
  event: TBoardEventPaginationResponse;
};

export type TBoardEventCardListProps = {
  data: TBoardEventPaginationResponse[];
  isLoading: boolean;
  isError: boolean;
  isFiltered: boolean;
  page: number;
  pageCount: number;
  rowCount: number;
  onRetry: () => void;
  onReset: () => void;
  onPageChange: (page: number) => void;
};

export type TBoardEventPaginationProps = {
  page: number;
  pageCount: number;
  rowCount: number;
  itemCount: number;
  onPageChange: (page: number) => void;
};

export type TBoardEventEmptyStateProps = {
  isFiltered: boolean;
  onReset: () => void;
};

export type TBoardEventErrorStateProps = {
  title: string;
  description: string;
  onRetry: () => void;
};

export type TBoardEventBannerProps = {
  bannerUrl: string | null;
  title: string;
  className?: string;
  priority?: boolean;
};

export type TBoardEventStatusBadgeProps = {
  status: EventStatusEnum;
  label: string;
  className?: string;
};

export type TBoardEventMemberStatusBadgeProps = {
  memberStatus: EventMemberStatusEnum;
  label: string;
  className?: string;
};
