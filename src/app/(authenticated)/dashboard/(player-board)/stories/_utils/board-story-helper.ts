// Every board story has its own read-only detail page
export function getBoardStoryHref(id: string) {
  return `/dashboard/stories/${id}`;
}

// "3 / 5" when capped, "3" when there is no member limit
export function formatBoardStoryMembers(
  joined: number,
  max: number | null | undefined,
) {
  return max ? `${joined} / ${max}` : String(joined);
}
