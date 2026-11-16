import { useInfiniteQuery } from "@tanstack/react-query";

import CONFIG from "@/common/constants/config";
import { getEventCommentReactionPagination } from "@/api/main/modules/events/[id]/comments";
import { getMainApiNextPage } from "@/api/main/utils/pagination";
import type { EventCommentReactionTypeEnum } from "@/api/main/modules/events/[id]/comments/enums/event-comment-reaction-type";

// Query key prefix of every reactor list of one comment (all tabs). Under
// COMMENT.ALL(), so a full comment refresh also refetches open lists
export function getPublicEventCommentReactionKey(
  eventId: string,
  commentId: string,
) {
  return [
    CONFIG.QUERY_KEY.MAIN_API.EVENT.COMMENT.ALL(),
    eventId,
    "reactions",
    commentId,
  ];
}

// Who reacted to a comment or reply, newest first. Public, so it works
// logged out. No type lists every reaction (the All tab)
export function useGetPublicEventCommentReactionPagination(
  eventId: string,
  commentId: string,
  perPage: number,
  options?: { type?: EventCommentReactionTypeEnum; enabled?: boolean },
) {
  const type = options?.type;
  return useInfiniteQuery({
    queryKey: [
      ...getPublicEventCommentReactionKey(eventId, commentId),
      type ?? null,
      perPage,
    ],
    queryFn: ({ pageParam }) =>
      getEventCommentReactionPagination({
        identifier: eventId,
        commentId,
        payload: { page: pageParam, per_page: perPage, type },
      }),
    initialPageParam: 1,
    getNextPageParam: getMainApiNextPage,
    enabled: !!eventId && !!commentId && (options?.enabled ?? true),
  });
}
