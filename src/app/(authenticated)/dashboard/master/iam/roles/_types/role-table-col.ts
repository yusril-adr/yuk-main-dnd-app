import type { TRolePaginationResponse } from "@/api/main/modules/master/iam/roles/types/role-pagination-response";

export type TRoleTableCol = Omit<TRolePaginationResponse, "permissions">;
