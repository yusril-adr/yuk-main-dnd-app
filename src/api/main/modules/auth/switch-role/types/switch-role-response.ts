import type { TUserEntity } from "@/api/main/types/entities/iam/user-entity";
import { TRoleEntity } from "@/api/main/types/entities/iam/role-entity";

export type TSwitchRoleResponse = TUserEntity & {
  selected_role: TRoleEntity | null;
  permissions: string[];
  access_token: string;
};
