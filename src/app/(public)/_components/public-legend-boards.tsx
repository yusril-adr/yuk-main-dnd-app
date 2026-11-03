"use client";

import { Crown, Sword } from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import PublicLegendBoard from "@/app/(public)/_components/public-legend-board";
import type { TPublicLegendBoardsProps } from "@/app/(public)/_types/public-legend-boards-props";

// Shared DM / Heroes boards: tabs below md, side by side from md up
export default function PublicLegendBoards({
  dmTitle,
  heroesTitle,
  dmTabLabel,
  heroesTabLabel,
  copy,
  dmBoard,
  playerBoard,
}: TPublicLegendBoardsProps) {
  const dm = (
    <PublicLegendBoard
      kind="dm"
      title={dmTitle}
      icon={Crown}
      copy={copy}
      {...dmBoard}
    />
  );
  const player = (
    <PublicLegendBoard
      kind="player"
      title={heroesTitle}
      icon={Sword}
      copy={copy}
      {...playerBoard}
    />
  );

  return (
    <>
      {/* Below md: one board at a time via tabs */}
      <Tabs defaultValue="dm" className="md:hidden">
        <TabsList className="h-10! w-full rounded-md">
          <TabsTrigger value="dm" className="rounded-sm">
            <Crown /> {dmTabLabel}
          </TabsTrigger>
          <TabsTrigger value="player" className="rounded-sm">
            <Sword /> {heroesTabLabel}
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
    </>
  );
}
