import { useQuery } from "@tanstack/react-query";

import { getEventPagination } from "@/api/main/modules/master/events";
import type { TEventPaginationPayload } from "@/api/main/modules/master/events/types/event-pagination-payload";
import CONFIG from "@/common/constants/config";

export function useGetEventPagination(payload: TEventPaginationPayload) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.EVENT.ALL(), payload],
    queryFn: () => getEventPagination(payload),
  });
}
