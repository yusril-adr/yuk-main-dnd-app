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
import type { EventCommentReactionTypeEnum } from "@/api/main/modules/events/[id]/comments/enums/event-comment-reaction-type";
import type { TEventCommentPaginationResponse } from "@/api/main/modules/events/[id]/comments/types/event-comment-pagination-response";
import type { TEventCommentReplyPaginationResponse } from "@/api/main/modules/events/[id]/comments/types/event-comment-reply-pagination-response";
import {
  removeEventCommentReaction,
  setEventCommentReaction,
} from "@/api/main/modules/events/[id]/comments";
import { PUBLIC_EVENT_COMMENT_REACTIONS } from "@/app/(public)/events/[slug]/_constants/public-event-comment-reaction";
import { getPublicEventCommentReactionKey } from "@/app/(public)/events/[slug]/_hooks/use-get-public-event-comment-reaction-pagination";

type TCommentItem =
  TEventCommentPaginationResponse | TEventCommentReplyPaginationResponse;
type TCommentPages = InfiniteData<
  AxiosResponse<TMainApiPaginationResponse<TCommentItem>>
>;
// null removes the caller's reaction
type TReactVariables = { type: EventCommentReactionTypeEnum | null };
type TReactContext = { snapshots: [readonly unknown[], unknown][] };

const COUNT_KEY = Object.fromEntries(
  PUBLIC_EVENT_COMMENT_REACTIONS.map((option) => [
    option.type,
    option.countKey,
  ]),
) as Record<
  EventCommentReactionTypeEnum,
  (typeof PUBLIC_EVENT_COMMENT_REACTIONS)[number]["countKey"]
>;

// What the API will hold after the call: one reaction per user, so a switch
// moves one count from the old type to the new one
function applyReaction<T extends TCommentItem>(
  item: T,
  next: EventCommentReactionTypeEnum | null,
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

// PUT / DELETE /events/:id/comments/:commentId/reaction. Neither returns
// counts, so the cached comment is patched right away and rolled back on
// error; the thread it lives in refetches once its last tap settles. No
// success toast; 400/401 are toasted by the interceptor, a 404 is thrown as
// MainAPINotFoundError (pass onCommentError as onError)
export function useReactPublicEventComment(
  {
    eventId,
    commentId,
    parentId,
  }: { eventId: string; commentId: string; parentId: string | null },
  options?: Pick<
    UseMutationOptions<AxiosResponse, Error, TReactVariables, TReactContext>,
    "onError"
  >,
) {
  const queryClient = useQueryClient();
  const commentKey = CONFIG.QUERY_KEY.MAIN_API.EVENT.COMMENT.ALL();
  const mutationKey = [...commentKey, "reaction", commentId];

  // Only the list that holds this comment: a reply lives in its parent's
  // replies query, a top-level comment in the comment list (every viewer
  // variant and page size). Reactor lists also sit under [commentKey,
  // eventId] and are refetched on their own below
  const threadFilters: QueryFilters = parentId
    ? { queryKey: [commentKey, eventId, "replies", parentId] }
    : {
        queryKey: [commentKey, eventId],
        predicate: (query) =>
          query.queryKey[2] !== "replies" && query.queryKey[2] !== "reactions",
      };

  return useMutation<AxiosResponse, Error, TReactVariables, TReactContext>({
    mutationKey,
    // Taps on one comment reach the API in order, so the last one wins
    scope: { id: mutationKey.join(":") },
    mutationFn: ({ type }) =>
      type === null
        ? removeEventCommentReaction({ eventId, commentId })
        : setEventCommentReaction({ eventId, commentId, payload: { type } }),
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
        return Promise.all([
          queryClient.invalidateQueries(threadFilters),
          // Who-reacted lists of this comment (every tab)
          queryClient.invalidateQueries({
            queryKey: getPublicEventCommentReactionKey(eventId, commentId),
          }),
        ]);
      }
    },
  });
}
