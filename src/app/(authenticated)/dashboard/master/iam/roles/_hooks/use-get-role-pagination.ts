import { useQuery } from "@tanstack/react-query";

import { getRolePagination } from "@/api/main/modules/master/iam/roles";
import type { TRolePaginationPayload } from "@/api/main/modules/master/iam/roles/types/role-pagination-payload";
import CONFIG from "@/common/constants/config";

export function useGetRolePagination(payload: TRolePaginationPayload) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.ROLE.ALL(), payload],
    queryFn: () => getRolePagination(payload),
  });
}
