import { useQuery } from "@tanstack/react-query";

import { getPublicStoryPagination } from "@/api/main/modules/stories";
import type { TPublicStoryPaginationPayload } from "@/api/main/modules/stories/types/public-story-pagination-payload";
import CONFIG from "@/common/constants/config";

export function useGetHomeStories(payload: TPublicStoryPaginationPayload) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.STORY.ALL(), "home", payload],
    queryFn: () => getPublicStoryPagination(payload),
  });
}
