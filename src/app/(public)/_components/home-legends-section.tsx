"use client";

import { useMemo } from "react";
import { Crown, Sword } from "lucide-react";

import HomeBand from "@/app/(public)/_components/home-band";
import HomeSectionHeader from "@/app/(public)/_components/home-section-header";
import HomeLegendBoard from "@/app/(public)/_components/home-legend-board";
import {
  useGetHomeTopDms,
  useGetHomeTopPlayers,
} from "@/app/(public)/_hooks/use-get-home-top-experience";
import { getHomeMonthRange } from "@/app/(public)/_utils/home-helper";

export default function HomeLegendsSection() {
  const { payload, monthLabel } = useMemo(() => getHomeMonthRange(), []);
  const playersQuery = useGetHomeTopPlayers(payload);
  const dmsQuery = useGetHomeTopDms(payload);

  const players = (playersQuery.data?.data?.data ?? [])
    .slice(0, 3)
    .map((user) => ({
      user,
      gainedExp: user.gained_player_exp,
      level: user.player_level,
    }));
  const dms = (dmsQuery.data?.data?.data ?? []).slice(0, 3).map((user) => ({
    user,
    gainedExp: user.gained_dm_exp,
    level: user.dm_level,
  }));

  return (
    <HomeBand labelledBy="legends">
      <HomeSectionHeader
        id="legends"
        title="Legends of the month"
        description={`The adventurers and Dungeon Masters who gained the most EXP in ${monthLabel}.`}
        linkHref="/guildmates"
        linkLabel="See all guildmates"
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <HomeLegendBoard
          title="Heroes"
          icon={Sword}
          levelLabel="Player"
          entries={players}
          isLoading={playersQuery.isPending}
          isError={playersQuery.isError}
          onRetry={() => playersQuery.refetch()}
        />
        <HomeLegendBoard
          title="Dungeon Masters"
          icon={Crown}
          levelLabel="DM"
          entries={dms}
          isLoading={dmsQuery.isPending}
          isError={dmsQuery.isError}
          onRetry={() => dmsQuery.refetch()}
        />
      </div>
    </HomeBand>
  );
}
