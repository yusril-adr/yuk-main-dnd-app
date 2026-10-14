import { useQuery } from "@tanstack/react-query";

import { getMyPointPagination } from "@/api/main/modules/auth/me/points";
import type { TMyPointPaginationPayload } from "@/api/main/modules/auth/me/points/types/my-point-pagination-payload";
import CONFIG from "@/common/constants/config";

export function useGetMyPointPagination(payload: TMyPointPaginationPayload) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.AUTH.ME_POINTS(), payload],
    queryFn: () => getMyPointPagination(payload),
  });
}
