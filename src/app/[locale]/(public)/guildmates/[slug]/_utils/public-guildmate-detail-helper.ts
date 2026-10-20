// Share of the guildmate's total XP earned in one calling (0-100). The API
// has no level curve, so the bars compare DM vs hero XP instead of showing
// progress to the next level.
export function getExpShare(value: number, total: number) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

// Short, stable "card number" from the user id for the card frame
export function getCardNumber(id: string) {
  return id.replace(/-/g, "").slice(0, 6).toUpperCase();
}
