import { TRoleEntity } from "@/api/main/types/entities/iam/role-entity";
import type { TUserEntity } from "@/api/main/types/entities/iam/user-entity";

export type TUserMeResponse = TUserEntity & {
  selected_role: TRoleEntity | null;
  permissions: string[];
};
