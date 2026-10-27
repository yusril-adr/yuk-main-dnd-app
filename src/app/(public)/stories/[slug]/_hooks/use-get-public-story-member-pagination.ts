import { useInfiniteQuery } from "@tanstack/react-query";

import { getPublicStoryMemberPagination } from "@/api/main/modules/stories/[id]/members";
import CONFIG from "@/common/constants/config";
import { getMainApiNextPage } from "@/utils/pagination-helper";
import { OrderKeyEnum } from "@/common/enums/order-key";

// Infinite list like the dashboard members card: each "Show more" fetches the
// next page of perPage. created_at asc is join order (the API default
// updated_at reshuffles when a status changes). The key starts with
// STORY.ALL(), so join/leave invalidation refetches every loaded page.
export function useGetPublicStoryMemberPagination(
  storyId: string,
  perPage: number,
) {
  return useInfiniteQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.STORY.MEMBER.ALL(), storyId, perPage],
    queryFn: ({ pageParam }) =>
      getPublicStoryMemberPagination({
        id: storyId,
        payload: {
          page: pageParam,
          per_page: perPage,
          sort_by: "created_at",
          order: OrderKeyEnum.ASC,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: getMainApiNextPage,
    enabled: !!storyId,
  });
}
