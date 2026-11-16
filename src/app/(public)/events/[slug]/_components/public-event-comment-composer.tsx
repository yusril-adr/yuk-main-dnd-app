"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, MessageSquareLock } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/app/_components/ui/item";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { useT } from "@/app/_hooks/use-t";
import { getInitials, makeDefaultAvatarUrl } from "@/utils/user-helper";

import PublicEventCommentForm from "./public-event-comment-form";
import { useCreatePublicEventComment } from "@/app/(public)/events/[slug]/_hooks/use-create-public-event-comment";
import { useRefreshPublicEventComments } from "@/app/(public)/events/[slug]/_hooks/use-refresh-public-event-comments";
import { EVENT_DETAIL_MESSAGES } from "@/app/(public)/events/[slug]/_messages";
import type { TPublicEventCommentComposerProps } from "@/app/(public)/events/[slug]/_types/public-event-comment-composer-props";

export default function PublicEventCommentComposer({
  event,
}: TPublicEventCommentComposerProps) {
  const pathname = usePathname();
  const { t } = useT(EVENT_DETAIL_MESSAGES);
  const { auth, authQuery } = useAuthContext();
  const { refreshComments, onCommentError } = useRefreshPublicEventComments();
  const createMutation = useCreatePublicEventComment({
    onSuccess: refreshComments,
    onError: onCommentError,
  });

  const isAuthLoading = !!authQuery?.isLoading;

  if (isAuthLoading) {
    return <Skeleton className="h-36 w-full rounded-md" />;
  }

  if (!auth) {
    return (
      <Item
        variant="muted"
        className="flex-col items-stretch gap-3 sm:flex-row sm:items-center"
      >
        <ItemContent>
          <ItemTitle className="font-heading text-base">
            {t("comments.joinTitle")}
          </ItemTitle>
          <ItemDescription className="text-base">
            {t("comments.joinDescription")}
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            className="w-full sm:w-auto"
            render={
              <Link href={`/login?from=${encodeURIComponent(pathname)}`} />
            }
            nativeButton={false}
          >
            <LogIn /> {t("comments.loginToComment")}
          </Button>
        </ItemActions>
      </Item>
    );
  }

  // Logged in but the event does not take comments (not published/completed)
  if (!event.action_list.is_can_comment) {
    return (
      <Item variant="muted">
        <ItemMedia variant="icon">
          <MessageSquareLock />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{t("comments.closedTitle")}</ItemTitle>
          <ItemDescription className="text-base">
            {t("comments.closedDescription")}
          </ItemDescription>
        </ItemContent>
      </Item>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <Avatar className="mt-0.5 hidden size-10 shrink-0 border-2 border-primary/40 sm:flex">
        <AvatarImage
          src={auth.avatar_url ?? makeDefaultAvatarUrl(auth.display_name)}
          alt=""
          className="object-cover"
        />
        <AvatarFallback className="font-heading">
          {getInitials(auth.display_name)}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <PublicEventCommentForm
          id="comment-new"
          label={t("comments.writeLabel")}
          placeholder={t("comments.writePlaceholder")}
          submitLabel={t("comments.postComment")}
          isShowGuideline
          isPending={createMutation.isPending}
          onSubmit={(content) =>
            createMutation.mutateAsync({
              eventId: event.id,
              payload: { content },
            })
          }
        />
      </div>
    </div>
  );
}
