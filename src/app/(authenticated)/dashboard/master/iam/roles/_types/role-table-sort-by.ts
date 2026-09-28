import { TRoleSortBy } from "@/api/main/modules/master/iam/roles/consts/role-sort-by";

export type TRoleTableSortBy = Exclude<TRoleSortBy, "key" | "permissions">;
