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
