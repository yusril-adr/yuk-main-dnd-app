// Form input string -> payload number ("" = 0; never null, the column is NOT NULL)
export function toStoryRewardPayload(value: string): number {
  return value ? Number(value) : 0;
}

// 1250 -> "1,250 EXP"; null for 0 so the detail row shows its empty text.
// locale defaults to en-US so untranslated call sites keep English formatting.
export function formatStoryReward(
  value: number,
  unit: "EXP" | "GP",
  locale = "en-US",
): string | null {
  return value > 0 ? `${value.toLocaleString(locale)} ${unit}` : null;
}
