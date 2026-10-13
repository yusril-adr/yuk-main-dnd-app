import type { TStoryMemberEntity } from "@/api/main/types/entities/story/story-member-entity";

// Soft-deleted users keep their row; display_name gets " (Deleted User)"
export type TPublicStoryMemberPaginationResponse = Omit<
  TStoryMemberEntity,
  "updated_at"
>;
