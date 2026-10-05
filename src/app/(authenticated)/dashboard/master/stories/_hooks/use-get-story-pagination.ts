import { useQuery } from "@tanstack/react-query";

import { getStoryPagination } from "@/api/main/modules/master/stories";
import type { TStoryPaginationPayload } from "@/api/main/modules/master/stories/types/story-pagination-payload";
import CONFIG from "@/common/constants/config";

export function useGetStoryPagination(payload: TStoryPaginationPayload) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.STORY.ALL(), payload],
    queryFn: () => getStoryPagination(payload),
  });
}
