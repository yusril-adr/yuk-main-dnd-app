import { useInfiniteQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { getStoryMemberPagination } from "@/api/main/modules/master/stories/[id]/members";
import type { TStoryMemberResponse } from "@/api/main/modules/master/stories/[id]/members/types/story-member-response";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import CONFIG from "@/common/constants/config";
import { OrderKeyEnum } from "@/common/enums/order-key";

// created_at asc is join order. updated_at (the API default) reshuffles when status changes.
export function getStoryMemberNextPage(
  lastPage: AxiosResponse<TMainApiPaginationResponse<TStoryMemberResponse>>,
): number | undefined {
  const meta = lastPage.data?.data?.meta;
  if (!meta) return undefined;
  if (meta.current_page < meta.total_page) {
    return meta.current_page + 1;
  }
  return undefined;
}

export function getStoryMemberSearchParam(search?: string): string | undefined {
  if (!search || search.length < 3) return undefined;
  return search;
}

export function useGetStoryMemberPagination(
  storyId: string,
  perPage: number,
  options?: { search?: string; enabled?: boolean },
) {
  const appliedSearch = getStoryMemberSearchParam(options?.search);

  return useInfiniteQuery({
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
          sort_by: "created_at",
          order: OrderKeyEnum.ASC,
          ...(appliedSearch ? { search: appliedSearch } : {}),
        },
      }),
    initialPageParam: 1,
    getNextPageParam: getStoryMemberNextPage,
    enabled: !!storyId && (options?.enabled ?? true),
  });
}
