"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  MessageSquareReply,
  RotateCw,
} from "lucide-react";
import { Else, If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import { ItemGroup } from "@/app/_components/ui/item";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { Spinner } from "@/app/_components/ui/spinner";
import { useAuthContext } from "@/app/_hooks/use-auth-context";

import PublicStoryCommentForm from "./public-story-comment-form";
import PublicStoryCommentItem from "./public-story-comment-item";
import { useCreatePublicStoryComment } from "@/app/(public)/stories/[slug]/_hooks/use-create-public-story-comment";
import { useGetPublicStoryCommentReplyPagination } from "@/app/(public)/stories/[slug]/_hooks/use-get-public-story-comment-reply-pagination";
import { useRefreshPublicStoryComments } from "@/app/(public)/stories/[slug]/_hooks/use-refresh-public-story-comments";
import { PUBLIC_STORY_COMMENT_REPLY_PER_PAGE } from "@/app/(public)/stories/[slug]/_constants/public-story-comment";
import type { TPublicStoryCommentRepliesProps } from "@/app/(public)/stories/[slug]/_types/public-story-comment-replies-props";

// Thread under a top-level comment: Reply action, lazy replies (oldest
// first) and the reply form. Replies are one level deep
export default function PublicStoryCommentReplies({
  storyId,
  comment,
  isCanReply,
}: TPublicStoryCommentRepliesProps) {
  const { auth } = useAuthContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const { refreshComments, onCommentError } = useRefreshPublicStoryComments();
  const createMutation = useCreatePublicStoryComment({
    onSuccess: () => {
      setIsReplying(false);
      // Show the thread the new reply landed in
      setIsExpanded(true);
      refreshComments();
    },
    onError: onCommentError,
  });

  const replyCount = comment.reply_count;
  const hasReplies = replyCount > 0;
  const isOpen = isExpanded && hasReplies;
  const repliesQuery = useGetPublicStoryCommentReplyPagination(
    storyId,
    comment.id,
    PUBLIC_STORY_COMMENT_REPLY_PER_PAGE,
    { userId: auth?.id, enabled: isOpen },
  );
  const pages = repliesQuery.data?.pages ?? [];
  // Offset pages: a reply posted between "Load more" clicks can repeat
  const replies = [
    ...new Map(
      pages
        .flatMap((page) => page.data?.data?.items ?? [])
        .map((reply) => [reply.id, reply]),
    ).values(),
  ];
  const meta = pages[pages.length - 1]?.data?.data?.meta;
  const remaining = Math.max((meta?.total_all_data ?? 0) - replies.length, 0);

  // The API rejects replies to a deleted comment
  const canReply = isCanReply && !comment.is_deleted;
  const authorName = comment.author?.display_name ?? "a deleted comment";
  const repliesId = `comment-replies-${comment.id}`;
  const formId = `comment-reply-${comment.id}`;

  if (!canReply && !hasReplies) return null;

  return (
    <div className="mt-1 flex flex-col gap-2">
      <div className="-ms-2 flex flex-wrap items-center gap-1">
        <If condition={canReply}>
          <Then>
            <Button
              variant="ghost"
              size="xs"
              aria-expanded={isReplying}
              aria-controls={isReplying ? `${formId}-panel` : undefined}
              onClick={() => setIsReplying((value) => !value)}
            >
              <MessageSquareReply /> Reply
            </Button>
          </Then>
        </If>
        <If condition={hasReplies}>
          <Then>
            <Button
              variant="ghost"
              size="xs"
              aria-expanded={isOpen}
              aria-controls={repliesId}
              onClick={() => setIsExpanded((value) => !value)}
            >
              {isOpen ? <ChevronUp /> : <ChevronDown />}
              {isOpen
                ? "Hide replies"
                : `View ${replyCount} ${replyCount === 1 ? "reply" : "replies"}`}
            </Button>
          </Then>
        </If>
      </div>

      <If condition={isOpen}>
        <Then>
          <div
            id={repliesId}
            className="flex flex-col gap-1 border-s-2 border-primary/20 ps-3"
          >
            <If condition={repliesQuery.isLoading}>
              <Then>
                <div
                  className="flex flex-col gap-3 py-2"
                  aria-busy="true"
                  aria-label="Loading replies"
                >
                  {Array.from({ length: Math.min(replyCount, 2) }).map(
                    (_, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Skeleton className="size-8 shrink-0 rounded-full" />
                        <div className="flex flex-1 flex-col gap-2">
                          <Skeleton className="h-4 w-1/3" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </Then>
              <Else>
                <If condition={repliesQuery.isError}>
                  <Then>
                    <div className="flex flex-wrap items-center gap-2 py-2 text-sm text-destructive">
                      The replies could not be read.
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => repliesQuery.refetch()}
                      >
                        <RotateCw /> Try again
                      </Button>
                    </div>
                  </Then>
                  <Else>
                    <ItemGroup
                      className="flex flex-col"
                      aria-label={`Replies to ${authorName}`}
                    >
                      {replies.map((reply) => (
                        <PublicStoryCommentItem
                          key={reply.id}
                          storyId={storyId}
                          comment={reply}
                          isReply
                        />
                      ))}
                    </ItemGroup>

                    <If condition={repliesQuery.hasNextPage}>
                      <Then>
                        <Button
                          variant="ghost"
                          size="xs"
                          className="-ms-2 self-start"
                          disabled={repliesQuery.isFetchingNextPage}
                          onClick={() => repliesQuery.fetchNextPage()}
                        >
                          {repliesQuery.isFetchingNextPage ? (
                            <Spinner />
                          ) : (
                            <ChevronDown />
                          )}
                          {repliesQuery.isFetchingNextPage
                            ? "Loading replies..."
                            : `Load more replies (${remaining} more)`}
                        </Button>
                      </Then>
                    </If>
                  </Else>
                </If>
              </Else>
            </If>
          </div>
        </Then>
      </If>

      <If condition={canReply && isReplying}>
        <Then>
          <div
            id={`${formId}-panel`}
            className="border-s-2 border-primary/20 ps-3"
          >
            <PublicStoryCommentForm
              id={formId}
              label={`Reply to ${authorName}`}
              placeholder="Write a reply..."
              submitLabel="Post reply"
              isPending={createMutation.isPending}
              autoFocus
              onCancel={() => setIsReplying(false)}
              onSubmit={(content) =>
                createMutation.mutateAsync({
                  storyId,
                  payload: { content, parent_id: comment.id },
                })
              }
            />
          </div>
        </Then>
      </If>
    </div>
  );
}
