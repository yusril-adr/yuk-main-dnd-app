"use client";

import { If, Then } from "react-if";

import {
  EventCalendarNextIcon,
  EventCalendarPrevIcon,
} from "@/app/_components/event-calendar-icons";
import { Button } from "@/app/_components/ui/button";
import { useT } from "@/app/_hooks/use-t";
import { GUILDMATES_MESSAGES } from "@/app/(public)/guildmates/_messages";
import PublicLegendBoards from "@/app/(public)/_components/public-legend-boards";
import type { TPublicGuildmateLegendsSectionProps } from "@/app/(public)/guildmates/_types/public-guildmate-components-props";

export default function PublicGuildmateLegendsSection({
  headingMonth,
  monthLabel,
  isCurrentMonth,
  onPrevMonth,
  onNextMonth,
  dmBoard,
  playerBoard,
}: TPublicGuildmateLegendsSectionProps) {
  const { t } = useT(GUILDMATES_MESSAGES);
  // Generic wording until the client knows the month (prerendered page).
  // headingMonth includes the year when the selected month is in another year.
  const periodTitle = headingMonth
    ? t("legends.titleWithMonth", { month: headingMonth })
    : t("legends.titleFallback");
  const dmTitle = headingMonth
    ? t("legends.dungeonMastersOf", { month: headingMonth })
    : t("legends.dungeonMasters");
  const heroesTitle = headingMonth
    ? t("legends.heroesOf", { month: headingMonth })
    : t("legends.heroes");

  const copy = {
    unclaimed: t("legends.unclaimed"),
    awaitingMaster: t("legends.awaitingMaster"),
    awaitingHero: t("legends.awaitingHero"),
    expCaption: isCurrentMonth ? t("legends.soFar") : t("legends.earned"),
    errorTitle: t("legends.errorTitle"),
    errorDescription: t("legends.errorDescription"),
    empty: headingMonth
      ? t("legends.emptyWithMonth", { month: headingMonth })
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
        <div className="flex min-h-9 w-full items-center justify-center">
          <If condition={monthLabel !== null}>
            <Then>
              <div className="flex max-w-full items-center justify-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  onClick={onPrevMonth}
                  aria-label={t("legends.previousMonth")}
                >
                  <EventCalendarPrevIcon />
                </Button>
                <p
                  aria-live="polite"
                  className="min-h-4 min-w-0 px-1 text-xs tracking-[0.2em] text-primary uppercase"
                >
                  {monthLabel}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  onClick={onNextMonth}
                  disabled={isCurrentMonth}
                  aria-label={t("legends.nextMonth")}
                >
                  <EventCalendarNextIcon />
                </Button>
              </div>
            </Then>
          </If>
        </div>
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
