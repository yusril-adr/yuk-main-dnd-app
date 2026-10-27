import { useInfiniteQuery } from "@tanstack/react-query";

import { getStoryCommentReplyPagination } from "@/api/main/modules/stories/[id]/comments";
import CONFIG from "@/common/constants/config";
import { getMainApiNextPage } from "@/utils/pagination-helper";

// Replies of one top-level comment, oldest first, loaded only while the
// thread is open. The key starts with COMMENT.ALL(), so every comment
// mutation also refetches the open threads
export function useGetPublicStoryCommentReplyPagination(
  storyId: string,
  commentId: string,
  perPage: number,
  options?: { userId?: string | null; enabled?: boolean },
) {
  return useInfiniteQuery({
    queryKey: [
      CONFIG.QUERY_KEY.MAIN_API.STORY.COMMENT.ALL(),
      storyId,
      "replies",
      commentId,
      perPage,
      options?.userId ?? null,
    ],
    queryFn: ({ pageParam }) =>
      getStoryCommentReplyPagination({
        identifier: storyId,
        commentId,
        payload: { page: pageParam, per_page: perPage },
      }),
    initialPageParam: 1,
    getNextPageParam: getMainApiNextPage,
    enabled: !!storyId && !!commentId && (options?.enabled ?? true),
  });
}
