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

// 1250 -> "1,250 XP"; null for 0 so the detail row shows its empty text
export function formatBoardStoryReward(
  value: number,
  unit: "XP" | "GP",
): string | null {
  return value > 0 ? `${value.toLocaleString("en-US")} ${unit}` : null;
}
