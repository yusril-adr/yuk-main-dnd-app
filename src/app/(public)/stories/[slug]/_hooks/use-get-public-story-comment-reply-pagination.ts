import { useInfiniteQuery } from "@tanstack/react-query";

import { getStoryCommentReplyPagination } from "@/api/main/modules/stories/[id]/comments";
import CONFIG from "@/common/constants/config";

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
    getNextPageParam: (lastPage) => {
      const meta = lastPage.data?.data?.meta;
      if (!meta) return undefined;
      return meta.current_page < meta.total_page
        ? meta.current_page + 1
        : undefined;
    },
    enabled: !!storyId && !!commentId && (options?.enabled ?? true),
    retry: 1,
  });
}
