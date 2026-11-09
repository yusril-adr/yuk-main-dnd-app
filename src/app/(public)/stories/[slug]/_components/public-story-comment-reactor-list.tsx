"use client";

import { useCallback, useEffect, useState } from "react";
import { RotateCw } from "lucide-react";
import { Else, If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
} from "@/app/_components/ui/empty";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { Spinner } from "@/app/_components/ui/spinner";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { useT } from "@/app/_hooks/use-t";
import { COMMON_MESSAGES } from "@/messages/common";

import PublicStoryCommentReactorPinnedRow from "./public-story-comment-reactor-pinned-row";
import PublicStoryCommentReactorRow from "./public-story-comment-reactor-row";
import { PUBLIC_STORY_COMMENT_REACTOR_PER_PAGE } from "@/app/(public)/stories/[slug]/_constants/public-story-comment-reaction";
import { useGetPublicStoryCommentReactionPagination } from "@/app/(public)/stories/[slug]/_hooks/use-get-public-story-comment-reaction-pagination";
import { STORY_DETAIL_MESSAGES } from "@/app/(public)/stories/[slug]/_messages";
import type { TPublicStoryCommentReactorListProps } from "@/app/(public)/stories/[slug]/_types/public-story-comment-reactor-list-props";

// One tab of the who-reacted dialog, with infinite scroll. Mounted only
// while its tab is active, so only that list is fetched
export default function PublicStoryCommentReactorList({
  storyId,
  commentId,
  type,
  myReaction,
  isCanReact,
  onRemove,
  isRemoving,
}: TPublicStoryCommentReactorListProps) {
  const { t } = useT(STORY_DETAIL_MESSAGES);
  const { t: tCommon } = useT(COMMON_MESSAGES);
  const { auth } = useAuthContext();
  const query = useGetPublicStoryCommentReactionPagination(
    storyId,
    commentId,
    PUBLIC_STORY_COMMENT_REACTOR_PER_PAGE,
    { type },
  );
  // Your own reaction is the pinned row, so the list skips it
  const items = (
    query.data?.pages.flatMap((page) => page.data?.data?.items ?? []) ?? []
  ).filter((reaction) => reaction.user.id !== auth?.id);
  // Pinned on top, straight from the auth user, without waiting for the list
  const isPinnedShown =
    !!auth &&
    myReaction !== null &&
    (type === undefined || type === myReaction);
  const [scrollNode, setScrollNode] = useState<HTMLDivElement | null>(null);
  const [sentinelNode, setSentinelNode] = useState<HTMLDivElement | null>(null);

  const onReachEnd = useCallback(() => {
    // A failed page leaves the sentinel intersecting; Try again owns that retry
    if (
      !query.hasNextPage ||
      query.isFetchingNextPage ||
      query.isFetchNextPageError
    ) {
      return;
    }
    void query.fetchNextPage();
  }, [query]);

  useEffect(() => {
    if (!scrollNode || !sentinelNode) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) onReachEnd();
      },
      { root: scrollNode, rootMargin: "80px" },
    );
    observer.observe(sentinelNode);
    return () => observer.disconnect();
  }, [scrollNode, sentinelNode, onReachEnd]);

  return (
    <div ref={setScrollNode} className="max-h-80 min-h-0 overflow-y-auto pe-1">
      <PublicStoryCommentReactorPinnedRow
        isShown={isPinnedShown}
        myReaction={myReaction}
        isCanReact={isCanReact}
        onRemove={onRemove}
        isRemoving={isRemoving}
      />
      <If condition={query.isPending}>
        <Then>
          <div
            role="status"
            aria-label={t("comments.reactorsLoadingAria")}
            className="flex flex-col gap-3 py-1.5"
          >
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <Skeleton className="size-9 rounded-full" />
                <div className="flex flex-1 flex-col gap-1.5">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
                <Skeleton className="size-6 rounded-full" />
              </div>
            ))}
          </div>
        </Then>
        <Else>
          <If condition={query.isError && items.length === 0}>
            <Then>
              <div className="flex flex-col items-center gap-3 px-4 py-6 text-center">
                <p className="text-sm text-foreground">
                  {t("comments.reactorsError")}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => void query.refetch()}
                >
                  <RotateCw /> {tCommon("actions.tryAgain")}
                </Button>
              </div>
            </Then>
            <Else>
              <If condition={items.length === 0 && !isPinnedShown}>
                <Then>
                  <Empty className="p-4">
                    <EmptyHeader>
                      <EmptyDescription className="italic">
                        {t("comments.reactorsEmpty")}
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </Then>
                <Else>
                  <ul aria-label={t("comments.reactorsListAria")}>
                    {items.map((reaction) => (
                      <PublicStoryCommentReactorRow
                        key={reaction.id}
                        type={reaction.type}
                        user={reaction.user}
                      />
                    ))}
                  </ul>
                </Else>
              </If>
            </Else>
          </If>
        </Else>
      </If>
      <If condition={query.isFetchingNextPage}>
        <Then>
          <div className="flex justify-center py-3">
            <Spinner />
          </div>
        </Then>
      </If>
      <If condition={query.isFetchNextPageError}>
        <Then>
          <div className="flex justify-center py-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => void query.fetchNextPage()}
            >
              <RotateCw /> {tCommon("actions.tryAgain")}
            </Button>
          </div>
        </Then>
      </If>
      <div ref={setSentinelNode} className="h-px" />
    </div>
  );
}
