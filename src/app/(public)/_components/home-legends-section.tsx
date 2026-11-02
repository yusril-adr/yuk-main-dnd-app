"use client";

import { useMemo } from "react";

import { useT } from "@/app/_hooks/use-t";
import { HOME_MESSAGES } from "@/app/(public)/_messages";

import HomeBand from "@/app/(public)/_components/home-band";
import HomeSectionHeader from "@/app/(public)/_components/home-section-header";
import PublicLegendBoards from "@/app/(public)/_components/public-legend-boards";
import {
  useGetHomeTopDms,
  useGetHomeTopPlayers,
} from "@/app/(public)/_hooks/use-get-home-top-experience";
import { useHomePreviousMonthRange } from "@/app/(public)/_hooks/use-home-previous-month-range";
import type { TPublicLegendEntry } from "@/app/(public)/_types/public-legend-components-props";

export default function HomeLegendsSection() {
  const { t } = useT(HOME_MESSAGES);
  // null on the server/first paint; boards show their skeleton until then
  const range = useHomePreviousMonthRange();
  const monthName = range?.monthName ?? null;
  const playersQuery = useGetHomeTopPlayers(range?.payload ?? null);
  const dmsQuery = useGetHomeTopDms(range?.payload ?? null);

  const players: TPublicLegendEntry[] = useMemo(
    () =>
      (playersQuery.data?.data?.data ?? []).slice(0, 3).map((user, idx) => ({
        rank: idx + 1,
        user,
        gainedExp: user.gained_player_exp,
      })),
    [playersQuery.data],
  );
  const dms: TPublicLegendEntry[] = useMemo(
    () =>
      (dmsQuery.data?.data?.data ?? []).slice(0, 3).map((user, idx) => ({
        rank: idx + 1,
        user,
        gainedExp: user.gained_dm_exp,
      })),
    [dmsQuery.data],
  );

  const title = monthName
    ? t("legends.titleWithMonth", { month: monthName })
    : t("legends.titleFallback");
  const description = monthName
    ? t("legends.description", { month: range?.monthLabel })
    : t("legends.descriptionFallback");

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
    expCaption: t("legends.earned"),
    place: (rank: number) => t("legends.place", { rank }),
  };

  return (
    <HomeBand labelledBy="legends">
      <HomeSectionHeader
        id="legends"
        title={title}
        description={description}
        linkHref="/guildmates"
        linkLabel={t("legends.seeAll")}
      />
      <PublicLegendBoards
        dmTitle={dmTitle}
        heroesTitle={heroesTitle}
        dmTabLabel={t("legends.dungeonMasters")}
        heroesTabLabel={t("legends.heroes")}
        copy={copy}
        dmBoard={{
          entries: dms,
          isLoading: dmsQuery.isPending,
          isError: dmsQuery.isError,
          onRetry: () => dmsQuery.refetch(),
        }}
        playerBoard={{
          entries: players,
          isLoading: playersQuery.isPending,
          isError: playersQuery.isError,
          onRetry: () => playersQuery.refetch(),
        }}
      />
    </HomeBand>
  );
}
