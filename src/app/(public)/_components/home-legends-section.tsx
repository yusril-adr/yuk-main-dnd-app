"use client";

import { Crown, Sword } from "lucide-react";

import HomeBand from "@/app/(public)/_components/home-band";
import HomeSectionHeader from "@/app/(public)/_components/home-section-header";
import HomeLegendBoard from "@/app/(public)/_components/home-legend-board";
import {
  useGetHomeTopDms,
  useGetHomeTopPlayers,
} from "@/app/(public)/_hooks/use-get-home-top-experience";
import { useHomePreviousMonthRange } from "@/app/(public)/_hooks/use-home-previous-month-range";

export default function HomeLegendsSection() {
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

  return (
    <HomeBand labelledBy="legends">
      <HomeSectionHeader
        id="legends"
        title={monthName ? `Legends of ${monthName}` : "Last month's legends"}
        description={`The adventurers and Dungeon Masters who gained the most EXP in ${range?.monthLabel ?? "the previous month"}.`}
        linkHref="/guildmates"
        linkLabel="See all guildmates"
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <HomeLegendBoard
          title="Heroes"
          icon={Sword}
          monthName={monthName}
          entries={players}
          isLoading={playersQuery.isPending}
          isError={playersQuery.isError}
          onRetry={() => playersQuery.refetch()}
        />
        <HomeLegendBoard
          title="Dungeon Masters"
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
