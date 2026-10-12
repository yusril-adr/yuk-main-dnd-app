import { TUserEntity } from "@/api/main/types/entities/iam/user-entity";
import type { TStoryMemberEntity } from "@/api/main/types/entities/story/story-member-entity";

export type TStoryMemberPaginationResponse = Omit<
  TStoryMemberEntity,
  "updated_at" | "user"
> & {
  user: Pick<TUserEntity, "id" | "display_name" | "username" | "avatar_url">;
};
