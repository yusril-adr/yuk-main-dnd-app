import { useInfiniteQuery } from "@tanstack/react-query";

import { getEventCommentReplyPagination } from "@/api/main/modules/events/[id]/comments";
import CONFIG from "@/common/constants/config";
import { getMainApiNextPage } from "@/api/main/utils/pagination";

// Replies of one top-level comment, oldest first, loaded only while the
// thread is open. The key starts with COMMENT.ALL(), so every comment
// mutation also refetches the open threads
export function useGetPublicEventCommentReplyPagination(
  eventId: string,
  commentId: string,
  perPage: number,
  options?: { userId?: string | null; enabled?: boolean },
) {
  return useInfiniteQuery({
    queryKey: [
      CONFIG.QUERY_KEY.MAIN_API.EVENT.COMMENT.ALL(),
      eventId,
      "replies",
      commentId,
      perPage,
      options?.userId ?? null,
    ],
    queryFn: ({ pageParam }) =>
      getEventCommentReplyPagination({
        identifier: eventId,
        commentId,
        payload: { page: pageParam, per_page: perPage },
      }),
    initialPageParam: 1,
    getNextPageParam: getMainApiNextPage,
    enabled: !!eventId && !!commentId && (options?.enabled ?? true),
  });
}
