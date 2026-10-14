// Guildmate page accepts the username or falls back to the id
export function getGuildmateHref(user: {
  username: string | null;
  id: string;
}) {
  return `/guildmates/${user.username?.trim() || user.id}`;
}

const numberFormatter = new Intl.NumberFormat("en-US");

export function formatExp(value: number) {
  return numberFormatter.format(value ?? 0);
}
