import type { ScheduleItemTypeEnum } from "@/api/main/modules/schedules/enums/schedule-item-type";

export type TPublicScheduleFiltersProps = {
  type: ScheduleItemTypeEnum | null;
  onTypeChange: (type: ScheduleItemTypeEnum | null) => void;
};
