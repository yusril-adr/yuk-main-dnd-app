"use client";

import { groupPermissionsByModule } from "@/app/(authenticated)/dashboard/master/iam/roles/_utils/group-permissions-by-module";
import type { TRoleCreatePermissionChecboxInputsProps } from "../../_types/role-create-permission-checbox-inputs-props";
import RoleCreatePermissionModule from "./role-create-permission-module";

export default function RoleCreatePermissionChecboxInput({
  permissions,
  value,
  onChange,
  disabled,
}: TRoleCreatePermissionChecboxInputsProps) {
  const permissionsByModule = groupPermissionsByModule(permissions);
  const sortedPermissionsByModule = Object.entries(permissionsByModule).sort(
    ([aModule], [bModule]) => aModule.localeCompare(bModule),
  );

  return (
    <div className="flex flex-col gap-2">
      {sortedPermissionsByModule.map(([module, modulePermissions]) => (
        <RoleCreatePermissionModule
          key={module}
          module={module}
          permissions={modulePermissions}
          selectedPermissionIds={value}
          onPermissionChange={onChange}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
