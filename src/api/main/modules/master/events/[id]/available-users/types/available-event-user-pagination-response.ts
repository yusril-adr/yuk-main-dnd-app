import type { TUserEntity } from "@/api/main/types/entities/iam/user-entity";

export type TAvailableEventUserPaginationResponse = Pick<
  TUserEntity,
  "id" | "display_name" | "is_guest"
> & {
  username?: string | null;
  // Always sent, null when unset
  avatar_url: string | null;
};
