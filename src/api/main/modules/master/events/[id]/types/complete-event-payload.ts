// Attended member ids, at least one (unlike stories). Every other member is
// marked absent. Wire key is snake_case; the API converts it.
export type TCompleteEventPayload = {
  user_ids: [string, ...string[]];
};
