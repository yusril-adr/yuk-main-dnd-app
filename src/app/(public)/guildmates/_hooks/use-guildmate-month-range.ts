import { useMemo, useSyncExternalStore } from "react";

import { useLocale } from "@/app/_hooks/use-locale";
import type { TPublicGuildmateMonthRange } from "@/app/(public)/guildmates/_types/public-guildmate-month-range";
import {
  getCurrentUtcMonthKey,
  getMonthHeadingLabel,
  getTodayUtcKey,
  getUtcMonthRange,
  resolveGuildmateMonthKey,
} from "@/app/(public)/_utils/month-range-helper";

// The day never changes mid-visit in a way worth re-rendering for
const subscribe = () => () => {};

// The API ranks by UTC calendar dates. /guildmates is prerendered at build
// time, so the server snapshot is null (no date baked into the HTML) and
// today is read on the client after hydration, avoiding a mismatch.
export function useGuildmateMonthRange(
  requestedMonth: string | null,
): TPublicGuildmateMonthRange | null {
  const { locale } = useLocale();
  const todayKey = useSyncExternalStore(subscribe, getTodayUtcKey, () => null);

  return useMemo(() => {
    if (!todayKey) return null;

    const currentMonthKey = getCurrentUtcMonthKey(todayKey);
    const monthKey = resolveGuildmateMonthKey(requestedMonth, currentMonthKey);
    const range = getUtcMonthRange(monthKey, locale, todayKey);

    return {
      ...range,
      monthKey,
      currentMonthKey,
      isCurrent: monthKey === currentMonthKey,
      headingMonth: getMonthHeadingLabel(monthKey, currentMonthKey, range),
    };
  }, [todayKey, locale, requestedMonth]);
}
