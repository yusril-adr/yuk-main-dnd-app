import dayjs from "@/libs/dayjs";
import { DEFAULT_LOCALE } from "@/libs/i18n/locales";
import type { TLocale } from "@/libs/i18n/types/locale";
import type { TUtcMonthRange } from "@/app/(public)/_types/utc-month-range";

const MONTH_KEY_PATTERN = /^(\d{4})-(\d{2})$/;

// Today's UTC date ("YYYY-MM-DD"). The range and labels should be derived
// from this one value so they cannot disagree around midnight.
export function getTodayUtcKey() {
  return dayjs.utc().format("YYYY-MM-DD");
}

export function getCurrentUtcMonthKey(todayKey: string = getTodayUtcKey()) {
  return dayjs.utc(todayKey).format("YYYY-MM");
}

// Previous full UTC calendar month as "YYYY-MM". Starting from the 1st
// avoids day clamping; January steps back to December of last year.
export function getPreviousUtcMonthKey() {
  return dayjs.utc().startOf("month").subtract(1, "month").format("YYYY-MM");
}

// Strict "YYYY-MM" that maps to a real UTC calendar month; otherwise null
export function parseUtcMonthKey(value: string | null | undefined) {
  if (!value) return null;
  const match = MONTH_KEY_PATTERN.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const date = dayjs.utc(`${value}-01`);
  if (
    !date.isValid() ||
    date.year() !== year ||
    date.month() + 1 !== month ||
    date.date() !== 1
  ) {
    return null;
  }

  return date.format("YYYY-MM");
}

// Invalid or future months fall back to the current UTC month
export function resolveGuildmateMonthKey(
  requested: string | null | undefined,
  currentMonthKey: string,
) {
  const parsed = parseUtcMonthKey(requested);
  if (!parsed || parsed > currentMonthKey) return currentMonthKey;
  return parsed;
}

export function shiftUtcMonthKey(monthKey: string, delta: number) {
  return dayjs.utc(`${monthKey}-01`).add(delta, "month").format("YYYY-MM");
}

// First to last day of the given "YYYY-MM" month, plus locale month labels.
// When todayKey falls in that month, end_date is capped at today so a
// current-month board is "so far" rather than the whole month.
export function getUtcMonthRange(
  monthKey: string,
  locale: TLocale = DEFAULT_LOCALE,
  todayKey?: string,
): TUtcMonthRange {
  const month = dayjs.utc(`${monthKey}-01`).locale(locale);
  const startDate = month.startOf("month").format("YYYY-MM-DD");
  const monthEnd = month.endOf("month").format("YYYY-MM-DD");
  const isCurrent = todayKey !== undefined && getCurrentUtcMonthKey(todayKey) === monthKey;
  const endDate =
    isCurrent && todayKey && todayKey < monthEnd ? todayKey : monthEnd;

  return {
    payload: {
      start_date: startDate,
      end_date: endDate,
    },
    monthName: month.format("MMMM"),
    monthLabel: month.format("MMMM YYYY"),
  };
}

export function getMonthHeadingLabel(
  monthKey: string,
  currentMonthKey: string,
  range: TUtcMonthRange,
) {
  return monthKey.slice(0, 4) === currentMonthKey.slice(0, 4)
    ? range.monthName
    : range.monthLabel;
}
