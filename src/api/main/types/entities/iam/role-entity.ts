import { TBaseEntity } from "../base-entity";
import { TPermissionEntity } from "./permission-entity";
import { RoleKeyEnum } from "@/common/enums/role-key";

export type TRoleEntity = TBaseEntity & {
  key: RoleKeyEnum;
  name: string;
  description?: string;
  is_show_in_public: boolean;
  permissions?: TPermissionEntity[];
};
