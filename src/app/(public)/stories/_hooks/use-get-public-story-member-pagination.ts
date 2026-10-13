import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getPublicStoryMemberPagination } from "@/api/main/modules/stories/[id]/members";
import type { TPublicStoryMemberPaginationPayload } from "@/api/main/modules/stories/[id]/members/types/public-story-member-pagination-payload";
import CONFIG from "@/common/constants/config";

export function useGetPublicStoryMemberPagination(
  id: string,
  payload: TPublicStoryMemberPaginationPayload,
) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.STORY.MEMBER.ALL(), id, payload],
    queryFn: () => getPublicStoryMemberPagination({ id, payload }),
    enabled: !!id,
    // Keeps the current page visible while the next one loads
    placeholderData: keepPreviousData,
  });
}
