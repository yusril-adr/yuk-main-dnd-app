import { useInfiniteQuery } from "@tanstack/react-query";
import { getAvailableStoryUserPagination } from "@/api/main/modules/master/stories/[id]/available-users";
import CONFIG from "@/common/constants/config";
import { getMainApiNextPage } from "@/utils/pagination-helper";
import { OrderKeyEnum } from "@/common/enums/order-key";

// Same 3-character gate as the party list search. Shorter input is not sent.
export function getAvailableStoryUserSearchParam(
  search?: string,
): string | undefined {
  if (!search || search.length < 3) return undefined;
  return search;
}

export function useGetAvailableStoryUserPagination(
  storyId: string,
  perPage: number,
  options?: { search?: string; enabled?: boolean },
) {
  const appliedSearch = getAvailableStoryUserSearchParam(options?.search);

  return useInfiniteQuery({
    queryKey: appliedSearch
      ? [
          CONFIG.QUERY_KEY.MAIN_API.MASTER.STORY.ALL(),
          storyId,
          "available-users",
          perPage,
          appliedSearch,
        ]
      : [
          CONFIG.QUERY_KEY.MAIN_API.MASTER.STORY.ALL(),
          storyId,
          "available-users",
          perPage,
        ],
    queryFn: ({ pageParam }) =>
      getAvailableStoryUserPagination({
        id: storyId,
        payload: {
          page: pageParam,
          per_page: perPage,
          sort_by: "display_name",
          order: OrderKeyEnum.ASC,
          ...(appliedSearch ? { search: appliedSearch } : {}),
        },
      }),
    initialPageParam: 1,
    getNextPageParam: getMainApiNextPage,
    enabled: !!storyId && (options?.enabled ?? true),
  });
}
