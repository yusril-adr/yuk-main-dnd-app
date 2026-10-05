// Mirrors the API's FILE_STORY_BANNER_MAX_FILE_SIZE_BYTES (2 MB)
export const STORY_BANNER_MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024;

// The API does not validate file types, so the browser restricts them
export const STORY_BANNER_ACCEPTED_TYPES: string[] = [
  "image/jpeg",
  "image/png",
  "image/webp",
];
