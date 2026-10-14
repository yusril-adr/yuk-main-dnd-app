// Stories shown per home section
export const HOME_STORY_LIMIT = 3;

export const HOME_STORY_DATE_FORMAT = "ddd, D MMM YYYY";

// "What is this" pitch; icons are mapped in home-pitch
export const HOME_PITCH_POINTS = [
  {
    key: "friends",
    title: "Play with friends",
    description:
      "Pick an open quest, claim a seat and roll dice with a party of fellow adventurers, online or at the table.",
  },
  {
    key: "rewards",
    title: "Earn EXP & rewards",
    description:
      "Every finished quest grants experience and gold pieces. Level up and climb the monthly legends.",
  },
  {
    key: "dm",
    title: "Become a DM",
    description:
      "Ready to weave your own tale? Run quests for the guild and earn Dungeon Master experience.",
  },
] as const;
