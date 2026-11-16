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
import { useT } from "@/app/_hooks/use-t";
import { COMMON_MESSAGES } from "@/messages/common";

import PublicEventDetailSection from "./public-event-detail-section";
import PublicEventCommentComposer from "./public-event-comment-composer";
import PublicEventCommentItem from "./public-event-comment-item";
import PublicEventCommentReplies from "./public-event-comment-replies";
import { useGetPublicEventCommentPagination } from "@/app/(public)/events/[slug]/_hooks/use-get-public-event-comment-pagination";
import { PUBLIC_EVENT_COMMENT_PER_PAGE } from "@/app/(public)/events/[slug]/_constants/public-event-comment";
import { EVENT_DETAIL_MESSAGES } from "@/app/(public)/events/[slug]/_messages";
import type { TPublicEventCommentsProps } from "@/app/(public)/events/[slug]/_types/public-event-comments-props";

export default function PublicEventComments({
  event,
  className,
}: TPublicEventCommentsProps) {
  const { t } = useT(EVENT_DETAIL_MESSAGES);
  const { t: tCommon } = useT(COMMON_MESSAGES);
  const { auth } = useAuthContext();
  const commentsQuery = useGetPublicEventCommentPagination(
    event.id,
    PUBLIC_EVENT_COMMENT_PER_PAGE,
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
  const isCanReply = !!auth && event.action_list.is_can_comment;

  return (
    <PublicEventDetailSection
      icon={MessagesSquare}
      title={t("comments.title")}
      className={className}
    >
      <If condition={!!meta}>
        <Then>
          <p className="-mt-2 text-sm text-foreground/80" aria-live="polite">
            {t(
              total === 1 ? "comments.count_one" : "comments.count_other",
              { count: total },
            )}
          </p>
        </Then>
      </If>

      <PublicEventCommentComposer event={event} />

      <Separator />

      <If condition={commentsQuery.isLoading}>
        <Then>
          <ItemGroup
            className="flex flex-col gap-2"
            aria-busy="true"
            aria-label={t("comments.loadingAria")}
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
                    {t("comments.error")}
                  </EmptyTitle>
                </EmptyHeader>
                <EmptyContent>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => commentsQuery.refetch()}
                  >
                    <RotateCw /> {tCommon("actions.tryAgain")}
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
                        {t("comments.emptyTitle")}
                      </EmptyTitle>
                      <EmptyDescription className="text-base">
                        {t("comments.emptyDescription")}
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </Then>
                <Else>
                  <ItemGroup
                    className="flex flex-col gap-2"
                    aria-label={t("comments.listAria")}
                  >
                    {comments.map((comment) => (
                      <PublicEventCommentItem
                        key={comment.id}
                        eventId={event.id}
                        comment={comment}
                      >
                        <PublicEventCommentReplies
                          eventId={event.id}
                          comment={comment}
                          isCanReply={isCanReply}
                        />
                      </PublicEventCommentItem>
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
                          ? t("comments.loadingMore")
                          : t("comments.loadMore", { count: remaining })}
                      </Button>
                    </Then>
                  </If>
                </Else>
              </If>
            </Else>
          </If>
        </Else>
      </If>
    </PublicEventDetailSection>
  );
}
