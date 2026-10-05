export type TRoleCreatePayload = {
  name: string;
  description?: string;
  is_show_in_public?: boolean;
  permissionIds?: string[];
};
