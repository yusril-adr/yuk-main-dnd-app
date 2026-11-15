// Attended member ids. Unlike stories at least one is required (400 when
// empty); every other member is marked absent. Wire key is snake_case; the
// API converts it.
export type TCompleteEventPayload = {
  user_ids: string[];
};
