import { useQuery } from "@tanstack/react-query";

import { getUserPagination } from "@/api/main/modules/master/iam/users";
import CONFIG from "@/common/constants/config";

export function useGetUserPagination(
  search?: string,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: [
      CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.USER.ALL(),
      "story-creator",
      search,
    ],
    queryFn: () =>
      getUserPagination({
        page: 1,
        per_page: 10,
        search,
      }),
    enabled: options?.enabled ?? true,
  });
}
