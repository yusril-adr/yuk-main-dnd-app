import { ScheduleItemTypeEnum } from "@/api/main/modules/schedules/enums/schedule-item-type";

export const PUBLIC_SCHEDULE_ITEM_COLORS = {
  [ScheduleItemTypeEnum.STORY]: {
    color: "var(--primary)",
    textColor: "var(--primary-foreground)",
  },
  [ScheduleItemTypeEnum.EVENT]: {
    color: "var(--chart-4)",
    textColor: "white",
  },
} as const;
