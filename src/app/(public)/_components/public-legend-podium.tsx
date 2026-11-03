"use client";

import PublicLegendPodiumSlot from "@/app/(public)/_components/public-legend-podium-slot";
import { PUBLIC_PODIUM_ORDER } from "@/app/(public)/_constants/public-legend-rank";
import type { TPublicLegendViewProps } from "@/app/(public)/_types/public-legend-components-props";

// sm and up: 2nd left, 1st center and raised, 3rd right
export default function PublicLegendPodium({
  kind,
  entries,
  copy,
}: TPublicLegendViewProps) {
  return (
    <ol className="grid grid-cols-3 items-end gap-2 lg:gap-3">
      {PUBLIC_PODIUM_ORDER.map((rank) => {
        const entry = entries.find((item) => item.rank === rank);

        return (
          <li
            key={rank}
            className="flex min-w-0 flex-col items-center gap-2 text-center"
          >
            <PublicLegendPodiumSlot
              rank={rank}
              kind={kind}
              entry={entry}
              copy={copy}
            />
          </li>
        );
      })}
    </ol>
  );
}
