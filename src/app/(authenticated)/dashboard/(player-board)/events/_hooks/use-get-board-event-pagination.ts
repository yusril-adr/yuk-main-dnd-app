import { useQuery } from "@tanstack/react-query";

import { getBoardEventPagination } from "@/api/main/modules/board/events";
import type { TBoardEventPaginationPayload } from "@/api/main/modules/board/events/types/board-event-pagination-payload";
import CONFIG from "@/common/constants/config";

export function useGetBoardEventPagination(
  payload: TBoardEventPaginationPayload,
) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.BOARD.EVENT.ALL(), payload],
    queryFn: () => getBoardEventPagination(payload),
  });
}
