import type { TUserPaginationResponse } from "../types/user-pagination-response";

export type TUserSortBy = Exclude<
  keyof TUserPaginationResponse,
  "roles" | "action_list"
>;
