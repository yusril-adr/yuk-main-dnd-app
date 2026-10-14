import dayjs from "@/libs/dayjs";

// Public story detail accepts the slug (falls back to the id)
export function getHomeStoryHref(story: { slug?: string | null; id: string }) {
  return `/stories/${story.slug || story.id}`;
}

// The API ranks by UTC calendar dates: first day of this month to today
export function getHomeMonthRange() {
  const now = dayjs.utc();
  return {
    payload: {
      start_date: now.startOf("month").format("YYYY-MM-DD"),
      end_date: now.format("YYYY-MM-DD"),
    },
    monthLabel: now.format("MMMM YYYY"),
  };
}
