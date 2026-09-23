import type { TRoleEntity } from "@/api/main/types/entities/iam/role-entity";

export type TLoginResponse = {
  access_token: string;
  selected_role: TRoleEntity | null;
};
