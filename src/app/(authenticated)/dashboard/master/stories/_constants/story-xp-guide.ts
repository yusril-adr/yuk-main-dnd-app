// EXP Awarded guide rows shown on the story create and edit forms. Guide only:
// DMs can enter any value. Labels/copy come from each page's messages catalog
export const STORY_XP_GUIDE_ROWS = [
  { key: "easy", xp: 5 },
  { key: "medium", xp: 7 },
  { key: "hard", xp: 10 },
] as const;

export type TStoryXpGuideRowKey = (typeof STORY_XP_GUIDE_ROWS)[number]["key"];
