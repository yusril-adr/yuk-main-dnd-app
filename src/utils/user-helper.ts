export const makeDefaultAvatarUrl = (name?: string) => {
  return `https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(name || "-")}`;
};

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Guildmate page accepts the username or falls back to the id
export function getGuildmateHref(user: {
  username?: string | null;
  id: string;
}) {
  return `/guildmates/${encodeURIComponent(user.username?.trim() || user.id)}`;
}
