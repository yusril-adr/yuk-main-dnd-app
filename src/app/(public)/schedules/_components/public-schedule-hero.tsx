"use client";

import { CalendarDays } from "lucide-react";
import { If, Then } from "react-if";

import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";
import { localeToBcp47 } from "@/libs/i18n/locales";
import { SCHEDULES_MESSAGES } from "@/app/(public)/schedules/_messages";
import type { TPublicScheduleHeroProps } from "@/app/(public)/schedules/_types/public-schedule-hero-props";

export default function PublicScheduleHero({
  totalItems,
}: TPublicScheduleHeroProps) {
  const { t } = useT(SCHEDULES_MESSAGES);
  const { locale } = useLocale();

  return (
    <Card className="rounded-md bg-muted/40 p-1.5 shadow-none">
      <CardContent className="flex flex-col items-center gap-3 rounded-sm border border-dashed border-primary/30 px-4 py-8 text-center sm:gap-4 sm:px-8 sm:py-12">
        <CalendarDays aria-hidden className="size-8 text-primary sm:size-10" />
        <p className="text-xs tracking-[0.25em] text-primary uppercase">
          {t("hero.badge")}
        </p>
        <h1 className="font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
          {t("hero.title")}
        </h1>
        <Separator className="w-40! bg-primary/40 sm:w-56!" />
        <p className="max-w-xl text-base text-muted-foreground">
          {t("hero.description")}
        </p>
        <If condition={totalItems !== null}>
          <Then>
            <p className="text-sm text-muted-foreground">
              <span className="font-heading text-xl text-foreground">
                {new Intl.NumberFormat(localeToBcp47(locale)).format(
                  totalItems ?? 0,
                )}
              </span>{" "}
              {t(totalItems === 1 ? "hero.count_one" : "hero.count_other")}
            </p>
          </Then>
        </If>
      </CardContent>
    </Card>
  );
}
