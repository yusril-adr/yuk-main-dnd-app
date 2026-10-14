import { useInfiniteQuery } from "@tanstack/react-query";

import { getPublicUserCreatedStoryPagination } from "@/api/main/modules/users";
import CONFIG from "@/common/constants/config";

// Load-more list: each page appends to the previous ones
export function useGetPublicGuildmateCreatedStories(
  identifier: string,
  perPage: number,
  options?: { enabled?: boolean },
) {
  return useInfiniteQuery({
    queryKey: [
      CONFIG.QUERY_KEY.MAIN_API.USER.CREATED_STORIES(),
      identifier,
      perPage,
    ],
    queryFn: ({ pageParam }) =>
      getPublicUserCreatedStoryPagination(identifier, {
        page: pageParam,
        per_page: perPage,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const meta = lastPage.data.data.meta;
      return meta.current_page < meta.total_page
        ? meta.current_page + 1
        : undefined;
    },
    enabled: (options?.enabled ?? true) && !!identifier,
  });
}
