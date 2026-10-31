// Stories shown per home section
export const HOME_STORY_LIMIT = 3;

export const HOME_STORY_DATE_FORMAT = "ddd, D MMM YYYY";

// "What is this" pitch keys; copy lives in messages/*/home.json
export const HOME_PITCH_KEYS = ["friends", "rewards", "dm"] as const;

export type THomePitchKey = (typeof HOME_PITCH_KEYS)[number];
