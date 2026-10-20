import { Crown, Sword } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import PublicGuildmateLegendBoard from "./public-guildmate-legend-board";
import type { TPublicGuildmateLegendsSectionProps } from "@/app/[locale]/(public)/guildmates/_types/public-guildmate-components-props";

export default function PublicGuildmateLegendsSection({
  monthName,
  monthLabel,
  dmBoard,
  playerBoard,
}: TPublicGuildmateLegendsSectionProps) {
  const t = useTranslations("guildmates.legends");
  // Generic wording until the client knows the month (prerendered page)
  const period = monthName ?? t("monthFallback");
  const dm = (
    <PublicGuildmateLegendBoard
      kind="dm"
      title={t("dmTitle", { month: period })}
      icon={Crown}
      monthName={monthName}
      {...dmBoard}
    />
  );
  const player = (
    <PublicGuildmateLegendBoard
      kind="player"
      title={t("heroTitle", { month: period })}
      icon={Sword}
      monthName={monthName}
      {...playerBoard}
    />
  );

  return (
    <section aria-labelledby="legends-heading" className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-1 text-center">
        <h2 id="legends-heading" className="font-heading text-2xl sm:text-3xl">
          {t("title", { month: period })}
        </h2>
        <p className="min-h-4 text-xs tracking-[0.2em] text-primary uppercase">
          {monthLabel}
        </p>
      </div>

      {/* Below md: one board at a time via tabs */}
      <Tabs defaultValue="dm" className="md:hidden">
        <TabsList className="h-10! w-full rounded-md">
          <TabsTrigger value="dm" className="rounded-sm">
            <Crown /> {t("tabDms")}
          </TabsTrigger>
          <TabsTrigger value="player" className="rounded-sm">
            <Sword /> {t("tabHeroes")}
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
