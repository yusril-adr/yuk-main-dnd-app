import { useInfiniteQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { getAvailableStoryUserPagination } from "@/api/main/modules/master/stories/[id]/available-users";
import type { TAvailableStoryUserResponse } from "@/api/main/modules/master/stories/[id]/available-users/types/available-story-user-response";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import CONFIG from "@/common/constants/config";
import { OrderKeyEnum } from "@/common/enums/order-key";

export function getAvailableStoryUserNextPage(
  lastPage: AxiosResponse<
    TMainApiPaginationResponse<TAvailableStoryUserResponse>
  >,
): number | undefined {
  const meta = lastPage.data?.data?.meta;
  if (!meta) return undefined;
  if (meta.current_page < meta.total_page) {
    return meta.current_page + 1;
  }
  return undefined;
}

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
    getNextPageParam: getAvailableStoryUserNextPage,
    enabled: !!storyId && (options?.enabled ?? true),
  });
}
