// Attended member ids. Empty is valid: every current member is marked viewer
// and no rewards are granted. Wire key is snake_case; the API converts it.
export type TCompleteStoryPayload = {
  user_ids: string[];
};
