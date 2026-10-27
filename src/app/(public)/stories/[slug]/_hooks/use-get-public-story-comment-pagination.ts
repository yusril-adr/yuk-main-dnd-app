import { useInfiniteQuery } from "@tanstack/react-query";

import { getStoryCommentPagination } from "@/api/main/modules/stories/[id]/comments";
import CONFIG from "@/common/constants/config";

// "Load more" list like the party roster. The API orders it (pinned first,
// then newest). action_list depends on the caller, so the viewer is part of
// the key; the key starts with STORY.ALL(), so story invalidations refetch it
export function useGetPublicStoryCommentPagination(
  storyId: string,
  perPage: number,
  options?: { userId?: string | null },
) {
  return useInfiniteQuery({
    queryKey: [
      CONFIG.QUERY_KEY.MAIN_API.STORY.COMMENT.ALL(),
      storyId,
      perPage,
      options?.userId ?? null,
    ],
    queryFn: ({ pageParam }) =>
      getStoryCommentPagination({
        identifier: storyId,
        payload: { page: pageParam, per_page: perPage },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const meta = lastPage.data?.data?.meta;
      if (!meta) return undefined;
      return meta.current_page < meta.total_page
        ? meta.current_page + 1
        : undefined;
    },
    enabled: !!storyId,
    retry: 1,
  });
}
