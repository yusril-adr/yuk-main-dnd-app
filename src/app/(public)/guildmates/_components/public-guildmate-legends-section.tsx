"use client";

import { useT } from "@/app/_hooks/use-t";
import { GUILDMATES_MESSAGES } from "@/app/(public)/guildmates/_messages";
import PublicLegendBoards from "@/app/(public)/_components/public-legend-boards";
import type { TPublicGuildmateLegendsSectionProps } from "@/app/(public)/guildmates/_types/public-guildmate-components-props";

export default function PublicGuildmateLegendsSection({
  monthName,
  monthLabel,
  dmBoard,
  playerBoard,
}: TPublicGuildmateLegendsSectionProps) {
  const { t } = useT(GUILDMATES_MESSAGES);
  // Generic wording until the client knows the month (prerendered page)
  const periodTitle = monthName
    ? t("legends.titleWithMonth", { month: monthName })
    : t("legends.titleFallback");
  const dmTitle = monthName
    ? t("legends.dungeonMastersOf", { month: monthName })
    : t("legends.dungeonMasters");
  const heroesTitle = monthName
    ? t("legends.heroesOf", { month: monthName })
    : t("legends.heroes");

  const copy = {
    unclaimed: t("legends.unclaimed"),
    awaitingMaster: t("legends.awaitingMaster"),
    awaitingHero: t("legends.awaitingHero"),
    expCaption: t("legends.soFar"),
    errorTitle: t("legends.errorTitle"),
    errorDescription: t("legends.errorDescription"),
    empty: monthName
      ? t("legends.emptyWithMonth", { month: monthName })
      : t("legends.emptyFallback"),
    dmExpTotal: (count: string) => t("legends.dmExpTotal", { count }),
    playerExpTotal: (count: string) => t("legends.playerExpTotal", { count }),
    dmExp: (count: string) => t("legends.dmExp", { count }),
    playerExp: (count: string) => t("legends.playerExp", { count }),
    gainedExp: (count: string) => t("legends.gainedExp", { count }),
    place: (rank: number) => t("legends.place", { rank }),
  };

  return (
    <section aria-labelledby="legends-heading" className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-1 text-center">
        <h2 id="legends-heading" className="font-heading text-2xl sm:text-3xl">
          {periodTitle}
        </h2>
        <p className="min-h-4 text-xs tracking-[0.2em] text-primary uppercase">
          {monthLabel}
        </p>
      </div>

      <PublicLegendBoards
        dmTitle={dmTitle}
        heroesTitle={heroesTitle}
        dmTabLabel={t("legends.dungeonMasters")}
        heroesTabLabel={t("legends.heroes")}
        copy={copy}
        dmBoard={dmBoard}
        playerBoard={playerBoard}
      />
    </section>
  );
}
