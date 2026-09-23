export const makeDefaultAvatarUrl = (name?: string) => {
  return `https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(name || "-")}`;
};
