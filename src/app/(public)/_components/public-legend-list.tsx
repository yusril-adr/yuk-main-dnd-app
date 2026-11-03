"use client";

import PublicLegendListRow from "@/app/(public)/_components/public-legend-list-row";
import type { TPublicLegendViewProps } from "@/app/(public)/_types/public-legend-components-props";

// Phones: a plain ranked list, 1 to 3 top to bottom
export default function PublicLegendList({
  kind,
  entries,
  copy,
}: TPublicLegendViewProps) {
  return (
    <ol className="flex flex-col gap-2">
      {[1, 2, 3].map((rank) => {
        const entry = entries.find((item) => item.rank === rank);

        return (
          <PublicLegendListRow
            key={entry?.user.id ?? `unclaimed-${rank}`}
            rank={rank}
            kind={kind}
            entry={entry}
            copy={copy}
          />
        );
      })}
    </ol>
  );
}
