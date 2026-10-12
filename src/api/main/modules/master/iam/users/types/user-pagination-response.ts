import type { TUserEntity } from "@/api/main/types/entities/iam/user-entity";

export type TUserPaginationResponse = TUserEntity & {
  action_list: {
    is_can_update: boolean;
    is_can_delete: boolean;
    is_can_view_balances: boolean;
  };
};
