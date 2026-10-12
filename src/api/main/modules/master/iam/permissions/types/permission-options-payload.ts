import { PermissionModuleEnum } from "@/api/main/modules/master/iam/permissions/enums/permission-module";
import { PermissionActionEnum } from "@/api/main/modules/master/iam/permissions/enums/permission-action";

export type TPermissionOptionsPayload = {
  module?: PermissionModuleEnum;
  action?: PermissionActionEnum;
};
