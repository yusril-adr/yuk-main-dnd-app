import { useMemo } from "react";

import dayjs from "@/libs/dayjs";

// The API ranks by UTC calendar dates: first day of this month to today
export function useCurrentMonthRange() {
  return useMemo(() => {
    const now = dayjs.utc();
    return {
      payload: {
        start_date: now.startOf("month").format("YYYY-MM-DD"),
        end_date: now.format("YYYY-MM-DD"),
      },
      monthLabel: now.format("MMMM YYYY"),
    };
  }, []);
}
