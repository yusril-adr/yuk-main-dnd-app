"use client";

import { groupPermissionsByModule } from "@/app/(authenticated)/dashboard/master/iam/roles/_utils/group-permissions-by-module";
import type { TRoleEditPermissionChecboxInputsProps } from "../../_types/role-edit-permission-checbox-inputs-props";
import RoleEditPermissionModule from "./role-edit-permission-module";

export default function RoleEditPermissionChecboxInputs({
  permissions,
  value,
  onChange,
  disabled,
}: TRoleEditPermissionChecboxInputsProps) {
  const permissionsByModule = groupPermissionsByModule(permissions);
  const sortedPermissionsByModule = Object.entries(permissionsByModule).sort(
    ([aModule], [bModule]) => aModule.localeCompare(bModule),
  );

  return (
    <div className="flex flex-col gap-2">
      {sortedPermissionsByModule.map(([module, modulePermissions]) => (
        <RoleEditPermissionModule
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
