import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

import { getBoardStoryMemberPagination } from "@/api/main/modules/board/stories/[id]";
import CONFIG from "@/common/constants/config";
import { OrderKeyEnum } from "@/common/enums/order-key";

// Search is only sent from 3 characters
export function getBoardStoryMemberSearchParam(search?: string) {
  if (!search || search.length < 3) return undefined;
  return search;
}

// created_at asc keeps join order stable while statuses change.
// Shared by the members card and the detail page prefetch, so both hit one cache entry
export function getBoardStoryMemberPaginationOptions(
  storyId: string,
  perPage: number,
  searchInput?: string,
) {
  const search = getBoardStoryMemberSearchParam(searchInput);

  return infiniteQueryOptions({
    queryKey: [
      CONFIG.QUERY_KEY.MAIN_API.BOARD.STORY.MEMBER.ALL(),
      storyId,
      perPage,
      search ?? null,
    ],
    queryFn: ({ pageParam }) =>
      getBoardStoryMemberPagination({
        id: storyId,
        payload: {
          page: pageParam,
          per_page: perPage,
          search,
          sort_by: "created_at",
          order: OrderKeyEnum.ASC,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const meta = lastPage.data?.data?.meta;
      if (!meta) return undefined;
      return meta.current_page < meta.total_page
        ? meta.current_page + 1
        : undefined;
    },
  });
}

export function useGetBoardStoryMemberPagination(
  storyId: string,
  perPage: number,
  options?: { search?: string; enabled?: boolean },
) {
  return useInfiniteQuery({
    ...getBoardStoryMemberPaginationOptions(storyId, perPage, options?.search),
    enabled: (options?.enabled ?? true) && !!storyId,
    retry: 1,
  });
}
