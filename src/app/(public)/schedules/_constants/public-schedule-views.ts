export const PUBLIC_SCHEDULE_VIEWS = ["dayGridMonth", "listWeek"] as const;

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

export const PUBLIC_SCHEDULE_MOBILE_LIST_DAY_HEADER_CLASS =
  "p-2 shrink-0 w-auto min-h-9 flex flex-row items-center gap-2";
export const PUBLIC_SCHEDULE_MOBILE_LIST_ITEM_CLASS =
  "group flex-wrap items-center gap-x-2 gap-y-0.5 p-2 rounded-md";
export const PUBLIC_SCHEDULE_MOBILE_LIST_ITEM_BEFORE_CLASS =
  "self-center rounded-full border-(--fc-event-color) border-5";
export const PUBLIC_SCHEDULE_MOBILE_LIST_ITEM_INNER_CLASS = "contents";
export const PUBLIC_SCHEDULE_MOBILE_LIST_ITEM_TIME_CLASS =
  "shrink-0 whitespace-nowrap text-sm";

export function formatPublicScheduleMoreLink(num: number) {
  return `+${num}`;
}

export function getPublicScheduleMobileListItemTitleClass(info: {
  event: { url?: string };
}) {
  const underline = info.event.url ? " group-hover:underline" : "";
  return `basis-full w-full min-w-0 !whitespace-normal !break-words !overflow-visible text-base font-medium${underline}`;
}

export const PUBLIC_SCHEDULE_MOBILE_LIST_VIEW_OPTIONS = {
  listDayHeaderClass: PUBLIC_SCHEDULE_MOBILE_LIST_DAY_HEADER_CLASS,
  listItemEventClass: PUBLIC_SCHEDULE_MOBILE_LIST_ITEM_CLASS,
  listItemEventBeforeClass: PUBLIC_SCHEDULE_MOBILE_LIST_ITEM_BEFORE_CLASS,
  listItemEventInnerClass: PUBLIC_SCHEDULE_MOBILE_LIST_ITEM_INNER_CLASS,
  listItemEventTimeClass: PUBLIC_SCHEDULE_MOBILE_LIST_ITEM_TIME_CLASS,
  listItemEventTitleClass: getPublicScheduleMobileListItemTitleClass,
} as const;
