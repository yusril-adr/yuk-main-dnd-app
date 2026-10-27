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
import { getInitials, makeDefaultAvatarUrl } from "@/utils/user-helper";

import PublicStoryCommentForm from "./public-story-comment-form";
import { useCreatePublicStoryComment } from "@/app/(public)/stories/[slug]/_hooks/use-create-public-story-comment";
import { useRefreshPublicStoryComments } from "@/app/(public)/stories/[slug]/_hooks/use-refresh-public-story-comments";
import type { TPublicStoryCommentComposerProps } from "@/app/(public)/stories/[slug]/_types/public-story-comment-composer-props";

export default function PublicStoryCommentComposer({
  story,
}: TPublicStoryCommentComposerProps) {
  const pathname = usePathname();
  const { auth, authQuery } = useAuthContext();
  const { refreshComments, onCommentError } = useRefreshPublicStoryComments();
  const createMutation = useCreatePublicStoryComment({
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
            Join the conversation
          </ItemTitle>
          <ItemDescription>
            Log in to leave a comment on this story.
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
            <LogIn /> Log in to comment
          </Button>
        </ItemActions>
      </Item>
    );
  }

  // Logged in but the story does not take comments (not published/completed)
  if (!story.action_list.is_can_comment) {
    return (
      <Item variant="muted">
        <ItemMedia variant="icon">
          <MessageSquareLock />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Comments are closed</ItemTitle>
          <ItemDescription>
            This story is not taking new comments.
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
        <PublicStoryCommentForm
          id="comment-new"
          label="Write a comment"
          placeholder="Share thy thoughts on this story..."
          submitLabel="Post comment"
          isPending={createMutation.isPending}
          onSubmit={(content) =>
            createMutation.mutateAsync({
              storyId: story.id,
              payload: { content },
            })
          }
        />
      </div>
    </div>
  );
}
