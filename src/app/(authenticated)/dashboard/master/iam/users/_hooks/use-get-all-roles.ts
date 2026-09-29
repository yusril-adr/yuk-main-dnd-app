import { useQuery } from "@tanstack/react-query";

import { getRolePagination } from "@/api/main/modules/master/iam/roles";
import CONFIG from "@/common/constants/config";

export function useGetAllRoles() {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.ROLE.ALL(), "all"],
    queryFn: () =>
      getRolePagination({
        page: 1,
        per_page: 100,
      }),
  });
}