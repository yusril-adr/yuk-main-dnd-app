import type { TStoryMemberEntity } from "@/api/main/types/entities/story/story-member-entity";

export type TStoryMemberPaginationResponse = Omit<
  TStoryMemberEntity,
  "updated_at"
>;
