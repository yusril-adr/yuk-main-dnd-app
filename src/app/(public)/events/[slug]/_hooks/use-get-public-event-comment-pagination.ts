import { useInfiniteQuery } from "@tanstack/react-query";

import { getEventCommentPagination } from "@/api/main/modules/events/[id]/comments";
import CONFIG from "@/common/constants/config";
import { getMainApiNextPage } from "@/api/main/utils/pagination";

// "Load more" list like the party roster. The API orders it (pinned first,
// then newest). action_list depends on the caller, so the viewer is part of
// the key; the key starts with EVENT.ALL(), so event invalidations refetch it
export function useGetPublicEventCommentPagination(
  eventId: string,
  perPage: number,
  options?: { userId?: string | null },
) {
  return useInfiniteQuery({
    queryKey: [
      CONFIG.QUERY_KEY.MAIN_API.EVENT.COMMENT.ALL(),
      eventId,
      perPage,
      options?.userId ?? null,
    ],
    queryFn: ({ pageParam }) =>
      getEventCommentPagination({
        identifier: eventId,
        payload: { page: pageParam, per_page: perPage },
      }),
    initialPageParam: 1,
    getNextPageParam: getMainApiNextPage,
    enabled: !!eventId,
  });
}
