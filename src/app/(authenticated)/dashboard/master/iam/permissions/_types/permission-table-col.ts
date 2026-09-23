import type { TPermissionResponse } from "@/api/main/modules/master/iam/permissions/types/permission-response";

export type TPermissionTableCol = Omit<TPermissionResponse, "updated_at"> & {};
