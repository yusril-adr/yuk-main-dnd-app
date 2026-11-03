// Stories shown per home section
export const HOME_STORY_LIMIT = 3;


// "What is this" pitch keys; copy lives in messages/*/home.json
export const HOME_PITCH_KEYS = ["friends", "rewards", "dm"] as const;

export type THomePitchKey = (typeof HOME_PITCH_KEYS)[number];
