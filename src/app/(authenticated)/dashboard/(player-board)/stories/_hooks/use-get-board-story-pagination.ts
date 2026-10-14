import { useQuery } from "@tanstack/react-query";

import { getBoardStoryPagination } from "@/api/main/modules/board/stories";
import type { TBoardStoryPaginationPayload } from "@/api/main/modules/board/stories/types/board-story-pagination-payload";
import CONFIG from "@/common/constants/config";

export function useGetBoardStoryPagination(
  payload: TBoardStoryPaginationPayload,
) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.BOARD.STORY.ALL(), payload],
    queryFn: () => getBoardStoryPagination(payload),
  });
}
