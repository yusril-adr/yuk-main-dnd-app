import type { TPublicUserPaginationResponse } from "@/api/main/modules/users/types/public-user-pagination-response";
import type { TPublicLegendBoardData } from "@/app/(public)/_types/public-legend-board-data";

export type TPublicGuildmateLegendsSectionProps = {
  monthName: string | null;
  monthLabel: string | null;
  dmBoard: TPublicLegendBoardData;
  playerBoard: TPublicLegendBoardData;
};

export type TPublicGuildmateHeroProps = {
  totalGuildmates: number | null;
};

export type TPublicGuildmateCardProps = {
  guildmate: TPublicUserPaginationResponse;
  priority?: boolean;
};

export type TPublicGuildmateSearchProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export type TPublicGuildmatePaginationProps = {
  page: number;
  pageCount: number;
  rowCount: number;
  itemCount: number;
  onPageChange: (page: number) => void;
};

export type TPublicGuildmateEmptyStateProps = {
  isFiltered: boolean;
  onReset: () => void;
};

export type TPublicGuildmateErrorStateProps = {
  title: string;
  description: string;
  onRetry: () => void;
  compact?: boolean;
};

export type TPublicGuildmateCardListProps = {
  data: TPublicUserPaginationResponse[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onReset: () => void;
  pageCount: number;
  rowCount: number;
  page: number;
  search: string;
  onPageChange: (page: number) => void;
};
