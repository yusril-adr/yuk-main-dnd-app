import { useInfiniteQuery } from "@tanstack/react-query";

import CONFIG from "@/common/constants/config";
import { getStoryCommentReactionPagination } from "@/api/main/modules/stories/[id]/comments";
import { getMainApiNextPage } from "@/api/main/utils/pagination";
import type { StoryCommentReactionTypeEnum } from "@/api/main/modules/stories/[id]/comments/enums/story-comment-reaction-type";

// Query key prefix of every reactor list of one comment (all tabs). Under
// COMMENT.ALL(), so a full comment refresh also refetches open lists
export function getPublicStoryCommentReactionKey(
  storyId: string,
  commentId: string,
) {
  return [
    CONFIG.QUERY_KEY.MAIN_API.STORY.COMMENT.ALL(),
    storyId,
    "reactions",
    commentId,
  ];
}

// Who reacted to a comment or reply, newest first. Public, so it works
// logged out. No type lists every reaction (the All tab)
export function useGetPublicStoryCommentReactionPagination(
  storyId: string,
  commentId: string,
  perPage: number,
  options?: { type?: StoryCommentReactionTypeEnum; enabled?: boolean },
) {
  const type = options?.type;
  return useInfiniteQuery({
    queryKey: [
      ...getPublicStoryCommentReactionKey(storyId, commentId),
      type ?? null,
      perPage,
    ],
    queryFn: ({ pageParam }) =>
      getStoryCommentReactionPagination({
        identifier: storyId,
        commentId,
        payload: { page: pageParam, per_page: perPage, type },
      }),
    initialPageParam: 1,
    getNextPageParam: getMainApiNextPage,
    enabled: !!storyId && !!commentId && (options?.enabled ?? true),
  });
}
