import { useQuery } from "@tanstack/react-query";

import { getBoardStoryById } from "@/api/main/modules/board/stories/[id]";
import CONFIG from "@/common/constants/config";

export function useGetBoardStoryById(id: string) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.BOARD.STORY.ALL(), "detail", id],
    queryFn: () => getBoardStoryById(id),
    enabled: !!id,
  });
}
