import type { LucideIcon } from "lucide-react";

import type { TPublicUserPaginationResponse } from "@/api/main/modules/users/types/public-user-pagination-response";

export type TPublicGuildmateLegendKind = "dm" | "player";

export type TPublicGuildmateLegendEntry = {
  rank: number;
  user: TPublicUserPaginationResponse;
  gainedExp: number;
};

export type TPublicGuildmateLegendBoardProps = {
  kind: TPublicGuildmateLegendKind;
  title: string;
  icon: LucideIcon;
  // Current UTC month in the page locale, e.g. "October"; null before hydration
  monthName: string | null;
  entries: TPublicGuildmateLegendEntry[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
};

export type TPublicGuildmateLegendViewProps = {
  kind: TPublicGuildmateLegendKind;
  entries: TPublicGuildmateLegendEntry[];
};

export type TPublicGuildmateLegendsSectionProps = {
  monthName: string | null;
  monthLabel: string | null;
  dmBoard: Omit<
    TPublicGuildmateLegendBoardProps,
    "kind" | "title" | "icon" | "monthName"
  >;
  playerBoard: Omit<
    TPublicGuildmateLegendBoardProps,
    "kind" | "title" | "icon" | "monthName"
  >;
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
  title?: string;
  description?: string;
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
