import type { ScheduleItemTypeEnum } from "@/api/main/modules/schedules/enums/schedule-item-type";

// start and end are ISO instants; the API rejects a range longer than 62 days
export type TPublicScheduleListPayload = {
  start: string;
  end: string;
  type?: ScheduleItemTypeEnum[];
};
