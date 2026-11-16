import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

import { getBoardEventMemberPagination } from "@/api/main/modules/board/events/[id]";
import CONFIG from "@/common/constants/config";
import { getMainApiNextPage } from "@/api/main/utils/pagination";
import { OrderKeyEnum } from "@/common/enums/order-key";

// Search is only sent from 3 characters
export function getBoardEventMemberSearchParam(search?: string) {
  if (!search || search.length < 3) return undefined;
  return search;
}

// created_at asc keeps join order stable while statuses change.
// Shared by the members card and the detail page prefetch, so both hit one cache entry
export function getBoardEventMemberPaginationOptions(
  eventId: string,
  perPage: number,
  searchInput?: string,
) {
  const search = getBoardEventMemberSearchParam(searchInput);

  return infiniteQueryOptions({
    queryKey: [
      CONFIG.QUERY_KEY.MAIN_API.BOARD.EVENT.MEMBER.ALL(),
      eventId,
      perPage,
      search ?? null,
    ],
    queryFn: ({ pageParam }) =>
      getBoardEventMemberPagination({
        id: eventId,
        payload: {
          page: pageParam,
          per_page: perPage,
          search,
          sort_by: "created_at",
          order: OrderKeyEnum.ASC,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: getMainApiNextPage,
  });
}

export function useGetBoardEventMemberPagination(
  eventId: string,
  perPage: number,
  options?: { search?: string; enabled?: boolean },
) {
  return useInfiniteQuery({
    ...getBoardEventMemberPaginationOptions(eventId, perPage, options?.search),
    enabled: (options?.enabled ?? true) && !!eventId,
  });
}
