"use client";

import { Swords, Tent } from "lucide-react";

import { ScheduleItemTypeEnum } from "@/api/main/modules/schedules/enums/schedule-item-type";
import { Tabs, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";
import { useT } from "@/app/_hooks/use-t";
import { SCHEDULES_MESSAGES } from "@/app/(public)/schedules/_messages";
import { PUBLIC_SCHEDULE_ITEM_COLORS } from "@/app/(public)/schedules/_constants/public-schedule-item-colors";
import type { TPublicScheduleFiltersProps } from "@/app/(public)/schedules/_types/public-schedule-filters-props";

const ALL = "all";
const TRIGGER_CLASS =
  "rounded-sm px-3 text-muted-foreground data-active:bg-primary data-active:text-primary-foreground data-active:shadow-none data-active:hover:text-primary-foreground sm:px-4";

export default function PublicScheduleFilters({
  type,
  onTypeChange,
}: TPublicScheduleFiltersProps) {
  const { t } = useT(SCHEDULES_MESSAGES);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Tabs
        value={type ?? ALL}
        onValueChange={(value) => {
          if (value === ScheduleItemTypeEnum.STORY) {
            onTypeChange(ScheduleItemTypeEnum.STORY);
            return;
          }
          if (value === ScheduleItemTypeEnum.EVENT) {
            onTypeChange(ScheduleItemTypeEnum.EVENT);
            return;
          }
          onTypeChange(null);
        }}
      >
        <TabsList
          aria-label={t("filters.type")}
          className="h-10! w-full rounded-md border bg-card p-1 sm:w-fit"
        >
          <TabsTrigger value={ALL} className={TRIGGER_CLASS}>
            {t("filters.all")}
          </TabsTrigger>
          <TabsTrigger
            value={ScheduleItemTypeEnum.STORY}
            className={TRIGGER_CLASS}
          >
            <Swords />
            {t("filters.story")}
          </TabsTrigger>
          <TabsTrigger
            value={ScheduleItemTypeEnum.EVENT}
            className={TRIGGER_CLASS}
          >
            <Tent />
            {t("filters.event")}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <ul className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <li className="flex items-center gap-2">
          <span
            aria-hidden
            className="size-2.5 rounded-full"
            style={{
              backgroundColor:
                PUBLIC_SCHEDULE_ITEM_COLORS[ScheduleItemTypeEnum.STORY].color,
            }}
          />
          {t("legend.story")}
        </li>
        <li className="flex items-center gap-2">
          <span
            aria-hidden
            className="size-2.5 rounded-full"
            style={{
              backgroundColor:
                PUBLIC_SCHEDULE_ITEM_COLORS[ScheduleItemTypeEnum.EVENT].color,
            }}
          />
          {t("legend.event")}
        </li>
      </ul>
    </div>
  );
}
