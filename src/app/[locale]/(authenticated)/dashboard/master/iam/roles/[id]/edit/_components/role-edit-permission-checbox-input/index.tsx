"use client";

import { groupPermissionsByModule } from "@/app/[locale]/(authenticated)/dashboard/master/iam/roles/_utils/group-permissions-by-module";
import RoleEditPermissionModule from "./role-edit-permission-module";
import { TRoleEditPermissionChecboxInputProps } from "../../_types/role-edit-permission-checbox-input-props";

export default function RoleEditPermissionChecboxInput({
  permissions,
  value,
  onChange,
  disabled,
}: TRoleEditPermissionChecboxInputProps) {
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
