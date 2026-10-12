import type { TRoleEntity } from "@/api/main/types/entities/iam/role-entity";

export type TRoleDetailResponse = TRoleEntity & {
  action_list: {
    is_can_update: boolean;
    is_can_delete: boolean;
  };
};
