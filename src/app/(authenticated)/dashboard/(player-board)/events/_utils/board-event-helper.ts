// Every board event has its own read-only detail page
export function getBoardEventHref(id: string) {
  return `/dashboard/events/${id}`;
}

// "3 / 5" when capped, "3" when there is no member limit
export function formatBoardEventMembers(
  joined: number,
  max: number | null | undefined,
) {
  return max ? `${joined} / ${max}` : String(joined);
}
