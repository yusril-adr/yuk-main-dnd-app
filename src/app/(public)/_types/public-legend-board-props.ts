import type { LucideIcon } from "lucide-react";

import type { TPublicLegendBoardData } from "@/app/(public)/_types/public-legend-board-data";
import type { TPublicLegendCopy } from "@/app/(public)/_types/public-legend-copy";
import type { TPublicLegendKind } from "@/app/(public)/_types/public-legend-kind";

export type TPublicLegendBoardProps = TPublicLegendBoardData & {
  kind: TPublicLegendKind;
  title: string;
  icon: LucideIcon;
  copy: TPublicLegendCopy;
};
