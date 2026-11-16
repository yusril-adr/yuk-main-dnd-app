export const PUBLIC_SCHEDULE_VIEWS = [
  "dayGridMonth",
  "dayGridWeek",
  "listWeek",
] as const;

export const PUBLIC_SCHEDULE_INITIAL_VIEW = "dayGridMonth";
export const PUBLIC_SCHEDULE_MOBILE_MEDIA = "(max-width: 639px)";

export const PUBLIC_SCHEDULE_MOBILE_TITLE_FORMAT = {
  month: "short",
  day: "numeric",
  year: "numeric",
} as const;

export const PUBLIC_SCHEDULE_TIME_FORMAT = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
} as const;

export const PUBLIC_SCHEDULE_MOBILE_MONTH_MAX_EVENTS = 0;
export const PUBLIC_SCHEDULE_MOBILE_POPOVER_CLASS =
  "border rounded-md overflow-x-hidden overflow-y-auto shadow-lg m-1 bg-popover text-popover-foreground [--fc-popover-z:50] pointer-events-auto min-w-0 w-[min(20rem,calc(100vw-1.25rem))] max-h-[calc(100dvh-1.25rem)]";

export function formatPublicScheduleMoreLink(num: number) {
  return `+${num}`;
}
