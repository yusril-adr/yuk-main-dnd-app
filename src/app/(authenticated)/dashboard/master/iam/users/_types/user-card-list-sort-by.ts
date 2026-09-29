import type { TUserSortBy } from "@/api/main/modules/master/iam/users/consts/user-sort-by";

export type TUserCardListSortBy = Extract<
  TUserSortBy,
  "display_name" | "username" | "email" | "created_at" | "updated_at"
>;