import type { TRoleResponse } from "@/api/main/modules/master/iam/roles/types/role-response";

export type TRoleTableCol = Omit<TRoleResponse, "permissions">;
