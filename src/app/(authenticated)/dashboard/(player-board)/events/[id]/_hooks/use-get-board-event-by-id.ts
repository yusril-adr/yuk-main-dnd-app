import { useQuery } from "@tanstack/react-query";

import { getBoardEventById } from "@/api/main/modules/board/events/[id]";
import CONFIG from "@/common/constants/config";

export function useGetBoardEventById(id: string) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.BOARD.EVENT.ALL(), "detail", id],
    queryFn: () => getBoardEventById(id),
    enabled: !!id,
  });
}
