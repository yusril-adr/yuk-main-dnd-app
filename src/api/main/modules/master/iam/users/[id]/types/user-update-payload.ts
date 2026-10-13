import type { TUserCreatePayload } from "@/api/main/modules/master/iam/users/types/user-create-payload";

// null clears a nullable field; omit a key to leave it unchanged
export type TUserUpdatePayload = Partial<
  Omit<TUserCreatePayload, "username" | "bio">
> & {
  username?: string | null;
  bio?: string | null;
};
