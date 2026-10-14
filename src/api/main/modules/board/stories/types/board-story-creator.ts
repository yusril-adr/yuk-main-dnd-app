import type { TUserEntity } from "@/api/main/types/entities/iam/user-entity";

// The board endpoints only send these creator fields
export type TBoardStoryCreator = Pick<
  TUserEntity,
  "id" | "display_name" | "avatar_url"
>;
