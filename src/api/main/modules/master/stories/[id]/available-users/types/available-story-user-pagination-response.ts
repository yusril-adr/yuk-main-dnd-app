import { TUserEntity } from "@/api/main/types/entities/iam/user-entity";

export type TAvailableStoryUserPaginationResponse = Pick<
  TUserEntity,
  "id" | "display_name" | "avatar_url"
>;
