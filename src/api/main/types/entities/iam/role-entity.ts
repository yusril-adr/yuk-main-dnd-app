import { TBaseEntity } from "./base-entity";
import { TPermissionEntity } from "./permission-entity";

export type TRoleEntity = TBaseEntity & {
  key: string;
  name: string;
  description?: string;
  permissions?: TPermissionEntity[];
};
