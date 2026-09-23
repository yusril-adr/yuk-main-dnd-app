import { TPermissionEntity } from "./permission-entity";

export type TRoleEntity = {
  id: string;
  key: string;
  name: string;
  description?: string;
  permissions?: TPermissionEntity[];
  createdAt: string;
  updatedAt: string;
};
