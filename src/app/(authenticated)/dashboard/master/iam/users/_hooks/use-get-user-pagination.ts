import { useQuery } from "@tanstack/react-query";

import { getUserPagination } from "@/api/main/modules/master/iam/users";
import type { TUserPaginationPayload } from "@/api/main/modules/master/iam/users/types/user-pagination-payload";
import CONFIG from "@/common/constants/config";

export function useGetUserPagination(payload: TUserPaginationPayload) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.USER.ALL(), payload],
    queryFn: () => getUserPagination(payload),
  });
}