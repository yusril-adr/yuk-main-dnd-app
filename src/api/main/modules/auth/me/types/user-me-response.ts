import type { RoleKeyEnum } from "@/common/enums/role-key";
import type { TUserEntity } from "@/api/main/types/entities/iam/user-entity";

export type TUserMeResponse = TUserEntity & {
  selected_role: RoleKeyEnum | null;
  permissions: string[];
};
