import type { TStoryResponse } from "../types/story-response";

export type TStorySortBy = Exclude<keyof TStoryResponse, "created_by">;
