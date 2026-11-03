import type { TPublicLegendEntry } from "@/app/(public)/_types/public-legend-entry";

export type TPublicLegendBoardData = {
  entries: TPublicLegendEntry[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
};
