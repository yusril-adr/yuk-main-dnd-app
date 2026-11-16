import { useQuery } from "@tanstack/react-query";

import { getPublicEventPagination } from "@/api/main/modules/events";
import type { TPublicEventPaginationPayload } from "@/api/main/modules/events/types/public-event-pagination-payload";
import CONFIG from "@/common/constants/config";

export function useGetPublicEventPagination(
  payload: TPublicEventPaginationPayload,
) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.EVENT.ALL(), payload],
    queryFn: () => getPublicEventPagination(payload),
  });
}
