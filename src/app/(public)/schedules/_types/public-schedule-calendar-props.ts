import type { EventInput } from "@fullcalendar/react";

export type TPublicScheduleCalendarProps = {
  events: EventInput[];
  isLoading: boolean;
  isError: boolean;
  onDatesSet: (start: string, end: string) => void;
  onRetry: () => void;
};
