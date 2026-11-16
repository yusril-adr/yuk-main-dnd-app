import type { ScheduleItemTypeEnum } from "@/api/main/modules/schedules/enums/schedule-item-type";

// The API always returns end: null and all_day: false
export type TPublicScheduleItem = {
  id: string;
  type: ScheduleItemTypeEnum;
  story_type: number | null;
  title: string;
  start: string;
  end: null;
  all_day: boolean;
  status: number;
  location_type: number;
  banner_url: string | null;
  slug: string;
};
