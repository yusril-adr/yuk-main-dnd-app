import { useQuery } from "@tanstack/react-query";

import { getPublicUserJoinedStoryPagination } from "@/api/main/modules/users";
import type { TPublicUserStoryPaginationPayload } from "@/api/main/modules/users/types/public-user-story-pagination-payload";
import CONFIG from "@/common/constants/config";

export function useGetPublicGuildmateJoinedStories(
  identifier: string,
  payload: TPublicUserStoryPaginationPayload,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: [
      CONFIG.QUERY_KEY.MAIN_API.USER.JOINED_STORIES(),
      identifier,
      payload,
    ],
    queryFn: () => getPublicUserJoinedStoryPagination(identifier, payload),
    enabled: (options?.enabled ?? true) && !!identifier,
  });
}
