import { useQuery } from "@tanstack/react-query";

import { getBoardStoryById } from "@/api/main/modules/board/stories/[id]";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import CONFIG from "@/common/constants/config";

export function useGetBoardStoryById(id: string) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.BOARD.STORY.ALL(), "detail", id],
    queryFn: () => getBoardStoryById(id),
    enabled: !!id,
    // A 404 will not fix itself; other errors get one retry
    retry: (count, error) =>
      !(error instanceof MainAPINotFoundError) && count < 1,
  });
}
