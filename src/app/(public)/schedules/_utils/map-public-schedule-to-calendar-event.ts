import type { EventInput } from "@fullcalendar/react";

import { ScheduleItemTypeEnum } from "@/api/main/modules/schedules/enums/schedule-item-type";
import type { TPublicScheduleItem } from "@/api/main/modules/schedules/types/public-schedule-item";
import { PUBLIC_SCHEDULE_ITEM_COLORS } from "@/app/(public)/schedules/_constants/public-schedule-item-colors";

export function mapPublicScheduleToCalendarEvent(
  item: TPublicScheduleItem,
): EventInput {
  const colors = PUBLIC_SCHEDULE_ITEM_COLORS[item.type];

  return {
    id: `${item.type}:${item.id}`,
    title: item.title,
    start: item.start,
    allDay: item.all_day,
    color: colors.color,
    textColor: colors.textColor,
    extendedProps: {
      type: item.type,
      slug: item.slug,
    },
    url:
      item.type === ScheduleItemTypeEnum.STORY
        ? `/stories/${encodeURIComponent(item.slug)}`
        : `/events/${encodeURIComponent(item.slug)}`,
  };
}
