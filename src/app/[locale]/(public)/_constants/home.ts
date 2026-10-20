// Stories shown per home section
export const HOME_STORY_LIMIT = 3;

export const HOME_STORY_DATE_FORMAT = "ddd, D MMM YYYY";

// "What is this" pitch; icons are mapped in home-pitch, copy lives in
// home.pitch.points.<key> (_messages)
export const HOME_PITCH_POINTS = [
  { key: "friends" },
  { key: "rewards" },
  { key: "dm" },
] as const;
