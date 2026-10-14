import { useQuery } from "@tanstack/react-query";

import { getPublicUserCreatedStoryPagination } from "@/api/main/modules/users";
import type { TPublicUserStoryPaginationPayload } from "@/api/main/modules/users/types/public-user-story-pagination-payload";
import CONFIG from "@/common/constants/config";

export function useGetPublicGuildmateCreatedStories(
  identifier: string,
  payload: TPublicUserStoryPaginationPayload,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: [
      CONFIG.QUERY_KEY.MAIN_API.USER.CREATED_STORIES(),
      identifier,
      payload,
    ],
    queryFn: () => getPublicUserCreatedStoryPagination(identifier, payload),
    enabled: (options?.enabled ?? true) && !!identifier,
  });
}
