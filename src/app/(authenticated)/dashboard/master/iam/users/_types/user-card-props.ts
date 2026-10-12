import type { TUserPaginationResponse } from "@/api/main/modules/master/iam/users/types/user-pagination-response";

export type TUserCardProps = {
  user: TUserPaginationResponse;
  onDelete?: (id: string) => void;
};
