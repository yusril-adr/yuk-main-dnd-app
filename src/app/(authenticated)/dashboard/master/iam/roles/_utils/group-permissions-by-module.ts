import type { TPermissionEntity } from "@/api/main/types/entities/iam/permission-entity";

export function groupPermissionsByModule(
  permissions: TPermissionEntity[] = [],
): Record<string, TPermissionEntity[]> {
  return permissions.reduce<Record<string, TPermissionEntity[]>>(
    (groups, permission) => {
      groups[permission.module] ??= [];
      groups[permission.module].push(permission);

      return groups;
    },
    {},
  );
}
