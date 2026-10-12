import { TRolePaginationResponse } from "../types/role-pagination-response";

export type TRoleSortBy = Exclude<keyof TRolePaginationResponse, "action_list">;
