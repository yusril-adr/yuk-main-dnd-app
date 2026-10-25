// EXP Awarded guide shown on the story create and edit forms. Guide only:
// DMs can enter any value. Edit the title, note and rows here; both forms
// read from this one object
export const STORY_XP_GUIDE = {
  title: "EXP guide by difficulty",
  note: "Only a guide. DMs can enter any value.",
  rows: [
    { label: "Easy", xp: 5 },
    { label: "Medium", xp: 7 },
    { label: "Hard", xp: 10 },
  ],
} as const;
