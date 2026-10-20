import { TPermissionEntity } from "@/api/main/types/entities/iam/permission-entity";

export type TRoleGroupedPermissionListProps = {
  module: string;
  permissions: TPermissionEntity[];
};
