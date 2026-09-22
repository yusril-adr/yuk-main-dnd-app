import type { TPermissionResponse } from "@/api/main/modules/permissions/types/permission-response";

export type TPermissionTableCol = Omit<TPermissionResponse, "updated_at"> & {};
