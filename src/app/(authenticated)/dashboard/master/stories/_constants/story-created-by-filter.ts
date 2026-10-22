// URL value for "any creator". With no created_by in the URL the list defaults
// to the current user, so clearing the filter needs an explicit value to survive
// refresh/back. Never sent to the API.
export const STORY_CREATED_BY_ALL = "all";
