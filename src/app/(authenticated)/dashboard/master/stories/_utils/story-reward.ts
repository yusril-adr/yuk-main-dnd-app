// Form input string -> payload number ("" = 0; never null, the column is NOT NULL)
export function toStoryRewardPayload(value: string): number {
  return value ? Number(value) : 0;
}

// 1250 -> "1,250 XP"; null for 0 so the detail row shows its empty text
export function formatStoryReward(
  value: number,
  unit: "XP" | "GP",
): string | null {
  return value > 0 ? `${value.toLocaleString("en-US")} ${unit}` : null;
}
