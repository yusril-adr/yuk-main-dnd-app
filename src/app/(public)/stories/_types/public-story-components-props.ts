export type TPublicStoryEmptyStateProps = {
  isFiltered: boolean;
  onReset: () => void;
};

export type TPublicStoryErrorStateProps = {
  title: string;
  description: string;
  onRetry: () => void;
};

export type TPublicStoryPaginationProps = {
  page: number;
  pageCount: number;
  rowCount: number;
  itemCount: number;
  onPageChange: (page: number) => void;
};

export type TPublicStoryListHeroProps = {
  totalStories: number | null;
};
