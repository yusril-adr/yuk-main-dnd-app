import { useMemo, useSyncExternalStore } from "react";
import { useLocale } from "next-intl";

import dayjs from "@/libs/dayjs";

// The day never changes mid-visit in a way worth re-rendering for
const subscribe = () => () => {};

// Today's UTC date ("YYYY-MM-DD"): the range and month label below are both
// derived from it, so they can't disagree around midnight
const getTodayKey = () => dayjs.utc().format("YYYY-MM-DD");

// The API ranks by UTC calendar dates: first day of this month to today.
// /guildmates is prerendered at build time, so the server snapshot is null
// (no date baked into the HTML) and today is read on the client after
// hydration, avoiding a mismatch.
export function useCurrentMonthRange() {
  const locale = useLocale();
  const todayKey = useSyncExternalStore(subscribe, getTodayKey, () => null);

  return useMemo(() => {
    if (!todayKey) return null;
    // Labels in the page locale ("October" / "Oktober")
    const today = dayjs.utc(todayKey).locale(locale);
    return {
      payload: {
        start_date: today.startOf("month").format("YYYY-MM-DD"),
        end_date: today.format("YYYY-MM-DD"),
      },
      monthName: today.format("MMMM"),
      monthLabel: today.format("MMMM YYYY"),
    };
  }, [todayKey, locale]);
}
