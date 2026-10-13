import type { TStoryEntity } from "@/api/main/types/entities/story/story-entity";

export type TPublicStorySortBy = Exclude<
  keyof TStoryEntity,
  "created_by" | "banner_url"
>;
