import type { LucideIcon } from "lucide-react";

import type { TPublicUserPaginationResponse } from "@/api/main/modules/users/types/public-user-pagination-response";

export type TPublicLegendKind = "dm" | "player";

export type TPublicLegendEntry = {
  rank: number;
  user: TPublicUserPaginationResponse;
  gainedExp: number;
};

// Translated strings for shared legend UI; each page builds these from its own catalog
export type TPublicLegendCopy = {
  unclaimed: string;
  awaitingMaster: string;
  awaitingHero: string;
  expCaption?: string;
  errorTitle: string;
  errorDescription: string;
  // Pre-resolved empty text (month already interpolated by the caller)
  empty: string;
  dmExpTotal: (count: string) => string;
  playerExpTotal: (count: string) => string;
  dmExp: (count: string) => string;
  playerExp: (count: string) => string;
  gainedExp: (count: string) => string;
  place: (rank: number) => string;
};

export type TPublicLegendBoardData = {
  entries: TPublicLegendEntry[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
};

export type TPublicLegendBoardProps = TPublicLegendBoardData & {
  kind: TPublicLegendKind;
  title: string;
  icon: LucideIcon;
  copy: TPublicLegendCopy;
};

export type TPublicLegendViewProps = {
  kind: TPublicLegendKind;
  entries: TPublicLegendEntry[];
  copy: TPublicLegendCopy;
};

export type TPublicLegendBoardsProps = {
  dmTitle: string;
  heroesTitle: string;
  dmTabLabel: string;
  heroesTabLabel: string;
  copy: TPublicLegendCopy;
  dmBoard: TPublicLegendBoardData;
  playerBoard: TPublicLegendBoardData;
};

export type TPublicAvatarProps = {
  name: string;
  avatarUrl: string | null;
  className?: string;
};

export type TPublicLegendListRowProps = {
  rank: number;
  kind: TPublicLegendKind;
  entry: TPublicLegendEntry | undefined;
  copy: TPublicLegendCopy;
};

export type TPublicLegendPodiumSlotProps = {
  rank: number;
  kind: TPublicLegendKind;
  entry: TPublicLegendEntry | undefined;
  copy: TPublicLegendCopy;
};
