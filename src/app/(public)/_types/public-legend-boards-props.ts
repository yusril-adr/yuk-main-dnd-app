import type { TPublicLegendBoardData } from "@/app/(public)/_types/public-legend-board-data";
import type { TPublicLegendCopy } from "@/app/(public)/_types/public-legend-copy";

export type TPublicLegendBoardsProps = {
  dmTitle: string;
  heroesTitle: string;
  dmTabLabel: string;
  heroesTabLabel: string;
  copy: TPublicLegendCopy;
  dmBoard: TPublicLegendBoardData;
  playerBoard: TPublicLegendBoardData;
};
