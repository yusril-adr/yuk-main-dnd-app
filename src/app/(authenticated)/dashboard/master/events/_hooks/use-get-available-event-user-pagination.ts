import { useInfiniteQuery } from "@tanstack/react-query";
import { getAvailableEventUserPagination } from "@/api/main/modules/master/events/[id]/available-users";
import CONFIG from "@/common/constants/config";
import { getMainApiNextPage } from "@/api/main/utils/pagination";
import { OrderKeyEnum } from "@/common/enums/order-key";

// Same 3-character gate as the party list search. Shorter input is not sent.
export function getAvailableEventUserSearchParam(
  search?: string,
): string | undefined {
  if (!search || search.length < 3) return undefined;
  return search;
}

export function useGetAvailableEventUserPagination(
  eventId: string,
  perPage: number,
  options?: { search?: string; enabled?: boolean },
) {
  const appliedSearch = getAvailableEventUserSearchParam(options?.search);

  return useInfiniteQuery({
    queryKey: appliedSearch
      ? [
          CONFIG.QUERY_KEY.MAIN_API.MASTER.EVENT.ALL(),
          eventId,
          "available-users",
          perPage,
          appliedSearch,
        ]
      : [
          CONFIG.QUERY_KEY.MAIN_API.MASTER.EVENT.ALL(),
          eventId,
          "available-users",
          perPage,
        ],
    queryFn: ({ pageParam }) =>
      getAvailableEventUserPagination({
        id: eventId,
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
    enabled: !!eventId && (options?.enabled ?? true),
  });
}
