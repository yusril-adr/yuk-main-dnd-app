import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { getStoryMemberPagination } from "@/api/main/modules/master/stories/[id]/members";
import CONFIG from "@/common/constants/config";
import { getMainApiNextPage } from "@/utils/pagination-helper";
import { OrderKeyEnum } from "@/common/enums/order-key";

export function getStoryMemberSearchParam(search?: string): string | undefined {
  if (!search || search.length < 3) return undefined;
  return search;
}

// Shared by the members card and the detail page prefetch, so both hit one cache entry
export function getStoryMemberPaginationOptions(
  storyId: string,
  perPage: number,
  search?: string,
) {
  const appliedSearch = getStoryMemberSearchParam(search);

  return infiniteQueryOptions({
    queryKey: appliedSearch
      ? [
          CONFIG.QUERY_KEY.MAIN_API.MASTER.STORY.ALL(),
          storyId,
          "members",
          perPage,
          appliedSearch,
        ]
      : [
          CONFIG.QUERY_KEY.MAIN_API.MASTER.STORY.ALL(),
          storyId,
          "members",
          perPage,
        ],
    queryFn: ({ pageParam }) =>
      getStoryMemberPagination({
        id: storyId,
        payload: {
          page: pageParam,
          per_page: perPage,
          // created_at asc is join order. updated_at (the API default) reshuffles when status changes.
          sort_by: "created_at",
          order: OrderKeyEnum.ASC,
          ...(appliedSearch ? { search: appliedSearch } : {}),
        },
      }),
    initialPageParam: 1,
    getNextPageParam: getMainApiNextPage,
  });
}

export function useGetStoryMemberPagination(
  storyId: string,
  perPage: number,
  options?: { search?: string; enabled?: boolean },
) {
  return useInfiniteQuery({
    ...getStoryMemberPaginationOptions(storyId, perPage, options?.search),
    enabled: !!storyId && (options?.enabled ?? true),
  });
}
