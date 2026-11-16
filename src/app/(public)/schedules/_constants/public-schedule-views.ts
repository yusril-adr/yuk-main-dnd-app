export const PUBLIC_SCHEDULE_VIEWS = [
  "dayGridMonth",
  "dayGridWeek",
  "listWeek",
] as const;

export const PUBLIC_SCHEDULE_DESKTOP_VIEW = "dayGridMonth";
export const PUBLIC_SCHEDULE_MOBILE_VIEW = "listWeek";
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
