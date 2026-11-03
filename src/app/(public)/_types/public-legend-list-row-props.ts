import type { TPublicLegendCopy } from "@/app/(public)/_types/public-legend-copy";
import type { TPublicLegendEntry } from "@/app/(public)/_types/public-legend-entry";
import type { TPublicLegendKind } from "@/app/(public)/_types/public-legend-kind";

export type TPublicLegendListRowProps = {
  rank: number;
  kind: TPublicLegendKind;
  entry: TPublicLegendEntry | undefined;
  copy: TPublicLegendCopy;
};
