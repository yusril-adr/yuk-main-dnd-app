import dayjs from "@/libs/dayjs";

// Public story detail accepts the slug (falls back to the id)
export function getHomeStoryHref(story: { slug?: string | null; id: string }) {
  return `/stories/${story.slug || story.id}`;
}

// Home legends rank the previous full UTC calendar month (the API ranks by
// UTC dates). Returned as "YYYY-MM" so the query range and the month label
// are both derived from this one value and can never disagree. Starting from
// the 1st avoids day clamping; January steps back to December of last year.
export function getHomePreviousMonthKey() {
  return dayjs.utc().startOf("month").subtract(1, "month").format("YYYY-MM");
}

// First to last day of the given "YYYY-MM" month, plus its labels in the
// page locale ("September" / "September 2026")
export function getHomeMonthRange(monthKey: string, locale: string) {
  const month = dayjs.utc(`${monthKey}-01`).locale(locale);
  return {
    payload: {
      start_date: month.startOf("month").format("YYYY-MM-DD"),
      end_date: month.endOf("month").format("YYYY-MM-DD"),
    },
    monthName: month.format("MMMM"),
    monthLabel: month.format("MMMM YYYY"),
  };
}
