"use client";

import { Crown, Sword } from "lucide-react";
import { useTranslations } from "next-intl";

import HomeBand from "@/app/[locale]/(public)/_components/home-band";
import HomeSectionHeader from "@/app/[locale]/(public)/_components/home-section-header";
import HomeLegendBoard from "@/app/[locale]/(public)/_components/home-legend-board";
import {
  useGetHomeTopDms,
  useGetHomeTopPlayers,
} from "@/app/[locale]/(public)/_hooks/use-get-home-top-experience";
import { useHomePreviousMonthRange } from "@/app/[locale]/(public)/_hooks/use-home-previous-month-range";

export default function HomeLegendsSection() {
  // null on the server/first paint; boards show their skeleton until then
  const t = useTranslations("home.legends");
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

  return (
    <HomeBand labelledBy="legends">
      <HomeSectionHeader
        id="legends"
        title={monthName ? t("title", { month: monthName }) : t("titleFallback")}
        description={t("description", {
          period: range?.monthLabel ?? t("periodFallback"),
        })}
        linkHref="/guildmates"
        linkLabel={t("seeAll")}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <HomeLegendBoard
          title={t("heroes")}
          icon={Sword}
          monthName={monthName}
          entries={players}
          isLoading={playersQuery.isPending}
          isError={playersQuery.isError}
          onRetry={() => playersQuery.refetch()}
        />
        <HomeLegendBoard
          title={t("dms")}
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
