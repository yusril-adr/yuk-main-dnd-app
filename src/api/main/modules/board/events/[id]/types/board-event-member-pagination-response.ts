import type { TUserEntity } from "@/api/main/types/entities/iam/user-entity";
import type { TEventMemberEntity } from "@/api/main/types/entities/event/event-member-entity";

// Soft-deleted users keep their row; display_name gets " (Deleted User)".
// username and avatar_url are always sent (null when unset)
export type TBoardEventMemberPaginationResponse = Omit<
  TEventMemberEntity,
  "updated_at" | "user"
> & {
  user: Pick<TUserEntity, "id" | "display_name" | "is_guest"> & {
    username: string | null;
    avatar_url: string | null;
  };
};
