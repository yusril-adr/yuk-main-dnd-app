import {
  useMutation,
  useQueryClient,
  type InfiniteData,
  type QueryFilters,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import CONFIG from "@/common/constants/config";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import type { StoryCommentReactionTypeEnum } from "@/api/main/modules/stories/[id]/comments/enums/story-comment-reaction-type";
import type { TStoryCommentPaginationResponse } from "@/api/main/modules/stories/[id]/comments/types/story-comment-pagination-response";
import type { TStoryCommentReplyPaginationResponse } from "@/api/main/modules/stories/[id]/comments/types/story-comment-reply-pagination-response";
import {
  removeStoryCommentReaction,
  setStoryCommentReaction,
} from "@/api/main/modules/stories/[id]/comments";
import { PUBLIC_STORY_COMMENT_REACTIONS } from "@/app/(public)/stories/[slug]/_constants/public-story-comment-reaction";

type TCommentItem =
  TStoryCommentPaginationResponse | TStoryCommentReplyPaginationResponse;
type TCommentPages = InfiniteData<
  AxiosResponse<TMainApiPaginationResponse<TCommentItem>>
>;
// null removes the caller's reaction
type TReactVariables = { type: StoryCommentReactionTypeEnum | null };
type TReactContext = { snapshots: [readonly unknown[], unknown][] };

const COUNT_KEY = Object.fromEntries(
  PUBLIC_STORY_COMMENT_REACTIONS.map((option) => [
    option.type,
    option.countKey,
  ]),
) as Record<
  StoryCommentReactionTypeEnum,
  (typeof PUBLIC_STORY_COMMENT_REACTIONS)[number]["countKey"]
>;

// What the API will hold after the call: one reaction per user, so a switch
// moves one count from the old type to the new one
function applyReaction<T extends TCommentItem>(
  item: T,
  next: StoryCommentReactionTypeEnum | null,
): T {
  const previous = item.my_reaction;
  if (previous === next) return item;
  const counts = { ...item.reaction_counts };
  if (previous !== null) {
    counts[COUNT_KEY[previous]] = Math.max(counts[COUNT_KEY[previous]] - 1, 0);
  }
  if (next !== null) counts[COUNT_KEY[next]] += 1;
  return {
    ...item,
    reaction_counts: counts,
    reaction_count: Object.values(counts).reduce((sum, n) => sum + n, 0),
    my_reaction: next,
  };
}

// PUT / DELETE /stories/:id/comments/:commentId/reaction. Neither returns
// counts, so the cached comment is patched right away and rolled back on
// error; the thread it lives in refetches once its last tap settles. No
// success toast; 400/401 are toasted by the interceptor, a 404 is thrown as
// MainAPINotFoundError (pass onCommentError as onError)
export function useReactPublicStoryComment(
  {
    storyId,
    commentId,
    parentId,
  }: { storyId: string; commentId: string; parentId: string | null },
  options?: Pick<
    UseMutationOptions<AxiosResponse, Error, TReactVariables, TReactContext>,
    "onError"
  >,
) {
  const queryClient = useQueryClient();
  const commentKey = CONFIG.QUERY_KEY.MAIN_API.STORY.COMMENT.ALL();
  const mutationKey = [...commentKey, "reaction", commentId];

  // Only the list that holds this comment: a reply lives in its parent's
  // replies query, a top-level comment in the comment list (every viewer
  // variant and page size)
  const threadFilters: QueryFilters = parentId
    ? { queryKey: [commentKey, storyId, "replies", parentId] }
    : {
        queryKey: [commentKey, storyId],
        predicate: (query) => query.queryKey[2] !== "replies",
      };

  return useMutation<AxiosResponse, Error, TReactVariables, TReactContext>({
    mutationKey,
    // Taps on one comment reach the API in order, so the last one wins
    scope: { id: mutationKey.join(":") },
    mutationFn: ({ type }) =>
      type === null
        ? removeStoryCommentReaction({ storyId, commentId })
        : setStoryCommentReaction({ storyId, commentId, payload: { type } }),
    onMutate: async ({ type }) => {
      await queryClient.cancelQueries(threadFilters);
      const snapshots = queryClient.getQueriesData(threadFilters);
      queryClient.setQueriesData<TCommentPages>(threadFilters, (data) =>
        data
          ? {
              ...data,
              pages: data.pages.map((page) => {
                const items = page.data?.data?.items;
                if (!items?.some((item) => item.id === commentId)) return page;
                return {
                  ...page,
                  data: {
                    ...page.data,
                    data: {
                      ...page.data.data,
                      items: items.map((item) =>
                        item.id === commentId
                          ? applyReaction(item, type)
                          : item,
                      ),
                    },
                  },
                };
              }),
            }
          : data,
      );
      return { snapshots };
    },
    onError: (error, variables, context, mutationContext) => {
      context?.snapshots.forEach(([queryKey, data]) =>
        queryClient.setQueryData(queryKey, data),
      );
      options?.onError?.(error, variables, context, mutationContext);
    },
    onSettled: () => {
      // A refetch while another tap is queued would flash the older state
      if (queryClient.isMutating({ mutationKey }) === 1) {
        return queryClient.invalidateQueries(threadFilters);
      }
    },
  });
}
