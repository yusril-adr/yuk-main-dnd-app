"use client";

import { ScheduleItemTypeEnum } from "@/api/main/modules/schedules/enums/schedule-item-type";
import { Tabs, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";
import { useT } from "@/app/_hooks/use-t";
import { SCHEDULES_MESSAGES } from "@/app/(public)/schedules/_messages";
import { PUBLIC_SCHEDULE_ITEM_COLORS } from "@/app/(public)/schedules/_constants/public-schedule-item-colors";
import type { TPublicScheduleFiltersProps } from "@/app/(public)/schedules/_types/public-schedule-filters-props";

const ALL = "all";

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
        <TabsList aria-label={t("filters.type")}>
          <TabsTrigger value={ALL}>{t("filters.all")}</TabsTrigger>
          <TabsTrigger value={ScheduleItemTypeEnum.STORY}>
            {t("filters.story")}
          </TabsTrigger>
          <TabsTrigger value={ScheduleItemTypeEnum.EVENT}>
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
