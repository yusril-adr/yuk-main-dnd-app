export function groupPermissionsByModule<T extends { module: string }>(
  permissions: T[] = [],
): Record<string, T[]> {
  return permissions.reduce<Record<string, T[]>>((groups, permission) => {
    groups[permission.module] ??= [];
    groups[permission.module].push(permission);

    return groups;
  }, {});
}
