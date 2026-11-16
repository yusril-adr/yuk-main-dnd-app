import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { getEventMemberPagination } from "@/api/main/modules/master/events/[id]/members";
import CONFIG from "@/common/constants/config";
import { getMainApiNextPage } from "@/api/main/utils/pagination";
import { OrderKeyEnum } from "@/common/enums/order-key";

export function getEventMemberSearchParam(search?: string): string | undefined {
  if (!search || search.length < 3) return undefined;
  return search;
}

// Shared by the members card and the detail page prefetch, so both hit one cache entry
export function getEventMemberPaginationOptions(
  eventId: string,
  perPage: number,
  search?: string,
) {
  const appliedSearch = getEventMemberSearchParam(search);

  return infiniteQueryOptions({
    queryKey: appliedSearch
      ? [
          CONFIG.QUERY_KEY.MAIN_API.MASTER.EVENT.ALL(),
          eventId,
          "members",
          perPage,
          appliedSearch,
        ]
      : [
          CONFIG.QUERY_KEY.MAIN_API.MASTER.EVENT.ALL(),
          eventId,
          "members",
          perPage,
        ],
    queryFn: ({ pageParam }) =>
      getEventMemberPagination({
        id: eventId,
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

export function useGetEventMemberPagination(
  eventId: string,
  perPage: number,
  options?: { search?: string; enabled?: boolean },
) {
  return useInfiniteQuery({
    ...getEventMemberPaginationOptions(eventId, perPage, options?.search),
    enabled: !!eventId && (options?.enabled ?? true),
  });
}
