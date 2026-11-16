// Form input string -> payload number ("" = 0; never null, the column is NOT NULL)
export function toEventRewardPayload(value: string): number {
  return value ? Number(value) : 0;
}

// 1250 -> "1,250 EXP"; null for 0 so the card shows no reward badge.
// locale defaults to en-US so untranslated call sites keep English formatting.
export function formatEventReward(
  value: number,
  unit: "EXP" | "GP",
  locale = "en-US",
): string | null {
  return value > 0 ? `${value.toLocaleString(locale)} ${unit}` : null;
}
