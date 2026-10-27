// Form input string -> payload number ("" = 0; never null, the column is NOT NULL)
export function toStoryRewardPayload(value: string): number {
  return value ? Number(value) : 0;
}
