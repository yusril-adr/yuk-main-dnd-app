"use client";

import { Crown, Sword } from "lucide-react";
import { useT } from "@/app/_hooks/use-t";
import { HOME_MESSAGES } from "@/app/(public)/_messages";

import HomeBand from "@/app/(public)/_components/home-band";
import HomeSectionHeader from "@/app/(public)/_components/home-section-header";
import HomeLegendBoard from "@/app/(public)/_components/home-legend-board";
import {
  useGetHomeTopDms,
  useGetHomeTopPlayers,
} from "@/app/(public)/_hooks/use-get-home-top-experience";
import { useHomePreviousMonthRange } from "@/app/(public)/_hooks/use-home-previous-month-range";

export default function HomeLegendsSection() {
  const { t } = useT(HOME_MESSAGES);
  // null on the server/first paint; boards show their skeleton until then
  const range = useHomePreviousMonthRange();
  const monthName = range?.monthName ?? null;
  const playersQuery = useGetHomeTopPlayers(range?.payload ?? null);
  const dmsQuery = useGetHomeTopDms(range?.payload ?? null);

  const players = (playersQuery.data?.data?.data ?? [])
    .slice(0, 3)
    .map((user) => ({
      user,
      gainedExp: user.gained_player_exp,
    }));
  const dms = (dmsQuery.data?.data?.data ?? []).slice(0, 3).map((user) => ({
    user,
    gainedExp: user.gained_dm_exp,
  }));

  const title = monthName
    ? t("legends.titleWithMonth", { month: monthName })
    : t("legends.titleFallback");
  const description = monthName
    ? t("legends.description", { month: range?.monthLabel })
    : t("legends.descriptionFallback");

  return (
    <HomeBand labelledBy="legends">
      <HomeSectionHeader
        id="legends"
        title={title}
        description={description}
        linkHref="/guildmates"
        linkLabel={t("legends.seeAll")}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <HomeLegendBoard
          title={t("legends.heroes")}
          icon={Sword}
          monthName={monthName}
          entries={players}
          isLoading={playersQuery.isPending}
          isError={playersQuery.isError}
          onRetry={() => playersQuery.refetch()}
        />
        <HomeLegendBoard
          title={t("legends.dungeonMasters")}
          icon={Crown}
          monthName={monthName}
          entries={dms}
          isLoading={dmsQuery.isPending}
          isError={dmsQuery.isError}
          onRetry={() => dmsQuery.refetch()}
        />
      </div>
    </HomeBand>
  );
}
