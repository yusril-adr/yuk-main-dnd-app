"use client";

import { ChevronDown, MessagesSquare, RotateCw } from "lucide-react";
import { Else, If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/app/_components/ui/empty";
import { Item, ItemGroup } from "@/app/_components/ui/item";
import { Separator } from "@/app/_components/ui/separator";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { Spinner } from "@/app/_components/ui/spinner";
import { useAuthContext } from "@/app/_hooks/use-auth-context";

import PublicStoryDetailSection from "./public-story-detail-section";
import PublicStoryCommentComposer from "./public-story-comment-composer";
import PublicStoryCommentItem from "./public-story-comment-item";
import PublicStoryCommentReplies from "./public-story-comment-replies";
import { useGetPublicStoryCommentPagination } from "@/app/(public)/stories/[slug]/_hooks/use-get-public-story-comment-pagination";
import { PUBLIC_STORY_COMMENT_PER_PAGE } from "@/app/(public)/stories/[slug]/_constants/public-story-comment";
import type { TPublicStoryCommentsProps } from "@/app/(public)/stories/[slug]/_types/public-story-comments-props";

export default function PublicStoryComments({
  story,
  className,
}: TPublicStoryCommentsProps) {
  const { auth } = useAuthContext();
  const commentsQuery = useGetPublicStoryCommentPagination(
    story.id,
    PUBLIC_STORY_COMMENT_PER_PAGE,
    { userId: auth?.id },
  );
  const pages = commentsQuery.data?.pages ?? [];
  // Pages are offset based, so a comment posted between "Load more" clicks
  // can shift one into the next page; drop the repeat
  const comments = [
    ...new Map(
      pages
        .flatMap((page) => page.data?.data?.items ?? [])
        .map((comment) => [comment.id, comment]),
    ).values(),
  ];
  // Latest page has the freshest total
  const meta = pages[pages.length - 1]?.data?.data?.meta;
  const total = meta?.total_all_data ?? 0;
  const remaining = Math.max(total - comments.length, 0);
  const isCanReply = !!auth && story.action_list.is_can_comment;

  return (
    <PublicStoryDetailSection
      icon={MessagesSquare}
      title="Tavern Talk"
      className={className}
    >
      <If condition={!!meta}>
        <Then>
          <p className="-mt-2 text-sm text-foreground/80" aria-live="polite">
            <span className="font-medium text-foreground">{total}</span>{" "}
            {total === 1 ? "comment" : "comments"}
          </p>
        </Then>
      </If>

      <PublicStoryCommentComposer story={story} />

      <Separator />

      <If condition={commentsQuery.isLoading}>
        <Then>
          <ItemGroup
            className="flex flex-col gap-2"
            aria-busy="true"
            aria-label="Loading comments"
          >
            {Array.from({ length: 3 }).map((_, idx) => (
              <Item
                key={idx}
                role="listitem"
                variant="outline"
                size="sm"
                className="flex-nowrap items-start"
              >
                <Skeleton className="size-10 rounded-full" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </Item>
            ))}
          </ItemGroup>
        </Then>
        <Else>
          <If condition={commentsQuery.isError}>
            <Then>
              <Empty className="border border-destructive/40 bg-destructive/5">
                <EmptyHeader>
                  <EmptyTitle className="text-base">
                    The comments could not be read.
                  </EmptyTitle>
                </EmptyHeader>
                <EmptyContent>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => commentsQuery.refetch()}
                  >
                    <RotateCw /> Try again
                  </Button>
                </EmptyContent>
              </Empty>
            </Then>
            <Else>
              <If condition={comments.length === 0}>
                <Then>
                  <Empty className="border border-dashed bg-muted/40">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <MessagesSquare />
                      </EmptyMedia>
                      <EmptyTitle className="font-heading text-lg">
                        No comments yet
                      </EmptyTitle>
                      <EmptyDescription>
                        Be the first to speak at this table.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </Then>
                <Else>
                  <ItemGroup
                    className="flex flex-col gap-2"
                    aria-label="Comments"
                  >
                    {comments.map((comment) => (
                      <PublicStoryCommentItem
                        key={comment.id}
                        storyId={story.id}
                        comment={comment}
                      >
                        <PublicStoryCommentReplies
                          storyId={story.id}
                          comment={comment}
                          isCanReply={isCanReply}
                        />
                      </PublicStoryCommentItem>
                    ))}
                  </ItemGroup>

                  <If condition={commentsQuery.hasNextPage}>
                    <Then>
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto sm:self-center"
                        disabled={commentsQuery.isFetchingNextPage}
                        onClick={() => commentsQuery.fetchNextPage()}
                      >
                        {commentsQuery.isFetchingNextPage ? (
                          <Spinner />
                        ) : (
                          <ChevronDown />
                        )}
                        {commentsQuery.isFetchingNextPage
                          ? "Loading comments..."
                          : `Load more comments (${remaining} more)`}
                      </Button>
                    </Then>
                  </If>
                </Else>
              </If>
            </Else>
          </If>
        </Else>
      </If>
    </PublicStoryDetailSection>
  );
}
