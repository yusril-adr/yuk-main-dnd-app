import { Crown, Sword } from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import PublicGuildmateLegendBoard from "./public-guildmate-legend-board";
import type { TPublicGuildmateLegendsSectionProps } from "@/app/(public)/guildmates/_types/public-guildmate-components-props";

const DM_TITLE = "Dungeon Masters of the Month";
const PLAYER_TITLE = "Heroes of the Month";

export default function PublicGuildmateLegendsSection({
  monthLabel,
  dmBoard,
  playerBoard,
}: TPublicGuildmateLegendsSectionProps) {
  const dm = (
    <PublicGuildmateLegendBoard
      kind="dm"
      title={DM_TITLE}
      icon={Crown}
      {...dmBoard}
    />
  );
  const player = (
    <PublicGuildmateLegendBoard
      kind="player"
      title={PLAYER_TITLE}
      icon={Sword}
      {...playerBoard}
    />
  );

  return (
    <section aria-labelledby="legends-heading" className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-1 text-center">
        <h2 id="legends-heading" className="font-heading text-2xl sm:text-3xl">
          Legends of the Month
        </h2>
        <p className="text-xs tracking-[0.2em] text-primary uppercase">
          {monthLabel}
        </p>
      </div>

      {/* Below md: one board at a time via tabs */}
      <Tabs defaultValue="dm" className="md:hidden">
        <TabsList className="h-10! w-full rounded-md">
          <TabsTrigger value="dm" className="rounded-sm">
            <Crown /> Dungeon Masters
          </TabsTrigger>
          <TabsTrigger value="player" className="rounded-sm">
            <Sword /> Heroes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dm">{dm}</TabsContent>
        <TabsContent value="player">{player}</TabsContent>
      </Tabs>

      {/* md and up: both boards side by side */}
      <div className="hidden gap-4 md:grid md:grid-cols-2 lg:gap-6">
        {dm}
        {player}
      </div>
    </section>
  );
}
