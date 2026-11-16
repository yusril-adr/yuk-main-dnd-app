export type TPublicEventEmptyStateProps = {
  isFiltered: boolean;
  onReset: () => void;
};

export type TPublicEventErrorStateProps = {
  title: string;
  description: string;
  onRetry: () => void;
};

export type TPublicEventPaginationProps = {
  page: number;
  pageCount: number;
  rowCount: number;
  itemCount: number;
  onPageChange: (page: number) => void;
};

export type TPublicEventListHeroProps = {
  totalEvents: number | null;
};
