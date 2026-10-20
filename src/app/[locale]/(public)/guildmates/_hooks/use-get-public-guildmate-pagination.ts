import { useQuery } from "@tanstack/react-query";

import { getPublicUserPagination } from "@/api/main/modules/users";
import type { TPublicUserPaginationPayload } from "@/api/main/modules/users/types/public-user-pagination-payload";
import CONFIG from "@/common/constants/config";

export function useGetPublicGuildmatePagination(
  payload: TPublicUserPaginationPayload,
) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.USER.ALL(), payload],
    queryFn: () => getPublicUserPagination(payload),
  });
}
