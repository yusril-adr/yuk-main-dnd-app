"use client";

import { useState } from "react";
import Link from "next/link";
import {
  EllipsisVertical,
  MessageSquareOff,
  Pencil,
  Pin,
  PinOff,
  Trash2,
} from "lucide-react";
import { Else, If, Then } from "react-if";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/app/_components/ui/item";
import { Spinner } from "@/app/_components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { cn } from "@/utils/cn";
import dayjs from "@/libs/dayjs";
import {
  getGuildmateHref,
  getInitials,
  makeDefaultAvatarUrl,
} from "@/utils/user-helper";

import PublicStoryCommentForm from "./public-story-comment-form";
import PublicStoryCommentDeleteDialog from "./public-story-comment-delete-dialog";
import { useUpdatePublicStoryComment } from "@/app/(public)/stories/[slug]/_hooks/use-update-public-story-comment";
import { useDeletePublicStoryComment } from "@/app/(public)/stories/[slug]/_hooks/use-delete-public-story-comment";
import { usePinPublicStoryComment } from "@/app/(public)/stories/[slug]/_hooks/use-pin-public-story-comment";
import { useUnpinPublicStoryComment } from "@/app/(public)/stories/[slug]/_hooks/use-unpin-public-story-comment";
import { useRefreshPublicStoryComments } from "@/app/(public)/stories/[slug]/_hooks/use-refresh-public-story-comments";
import { PUBLIC_STORY_DETAIL_DATE_FORMAT } from "@/app/(public)/stories/[slug]/_constants/public-story-detail-date-format";
import type { TPublicStoryCommentItemProps } from "@/app/(public)/stories/[slug]/_types/public-story-comment-item-props";

export default function PublicStoryCommentItem({
  storyId,
  comment,
  isReply = false,
  children,
}: TPublicStoryCommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { refreshComments, onCommentError } = useRefreshPublicStoryComments();

  const mutationOptions = {
    onSuccess: refreshComments,
    onError: onCommentError,
  };
  const updateMutation = useUpdatePublicStoryComment(
    {
      ...mutationOptions,
      onSuccess: () => {
        setIsEditing(false);
        refreshComments();
      },
    },
    isReply,
  );
  const deleteMutation = useDeletePublicStoryComment(mutationOptions, isReply);
  const pinMutation = usePinPublicStoryComment(mutationOptions);
  const unpinMutation = useUnpinPublicStoryComment(mutationOptions);

  const { author, action_list: actions } = comment;
  const isPinBusy = pinMutation.isPending || unpinMutation.isPending;
  const isBusy =
    isPinBusy || deleteMutation.isPending || updateMutation.isPending;
  const hasActions =
    actions.is_can_update ||
    actions.is_can_delete ||
    actions.is_can_pin ||
    actions.is_can_unpin;
  const ids = { storyId, commentId: comment.id };
  const authorName = author?.display_name ?? "Deleted comment";
  const noun = isReply ? "reply" : "comment";
  // Replies may open with "@username"; rendered as text, never as markup
  const leadingMention = isReply
    ? (comment.content?.match(/^@\S+/)?.[0] ?? null)
    : null;
  const avatarSize = isReply ? "size-8" : "size-10";
  const createdAt = dayjs(comment.created_at);

  return (
    <Item
      role="listitem"
      variant={isReply ? "default" : "outline"}
      size="sm"
      className={cn(
        "flex-nowrap items-start bg-background",
        // Thread rows sit inside the parent card, so no border or padding
        isReply && "bg-transparent px-0 py-1.5",
        comment.is_pinned && "border-primary/50 bg-primary/5",
        isBusy && "opacity-70",
      )}
    >
      <ItemMedia>
        <If condition={!!author}>
          <Then>
            {author && (
              <Avatar
                className={cn(
                  avatarSize,
                  "shrink-0 border-2 border-primary/40",
                )}
              >
                <AvatarImage
                  src={
                    author.avatar_url ??
                    makeDefaultAvatarUrl(author.display_name)
                  }
                  alt=""
                  loading="lazy"
                  className="object-cover"
                />
                <AvatarFallback className="font-heading">
                  {getInitials(author.display_name)}
                </AvatarFallback>
              </Avatar>
            )}
          </Then>
          <Else>
            <Avatar className={cn(avatarSize, "shrink-0")}>
              <AvatarFallback aria-hidden>
                <MessageSquareOff className="size-4 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
          </Else>
        </If>
      </ItemMedia>

      <ItemContent className="min-w-0 gap-1">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
          <ItemTitle className="min-w-0 truncate text-sm text-foreground">
            <If condition={!!author}>
              <Then>
                {author && (
                  <Link
                    href={getGuildmateHref(author)}
                    className="underline-offset-4 hover:text-primary hover:underline"
                  >
                    {author.display_name}
                  </Link>
                )}
              </Then>
              <Else>
                <span className="text-muted-foreground">{authorName}</span>
              </Else>
            </If>
          </ItemTitle>
          <If condition={comment.is_pinned}>
            <Then>
              <Badge
                variant="secondary"
                className="gap-1 rounded-sm text-primary shadow-none"
              >
                <Pin className="size-3" aria-hidden /> Pinned
              </Badge>
            </Then>
          </If>
        </div>
        <ItemDescription className="text-xs text-foreground/70">
          {author?.username ? `@${author.username} · ` : ""}
          {/* Relative while the absolute date stays in the tooltip and for screen readers */}
          <Tooltip>
            <TooltipTrigger
              render={
                <time
                  dateTime={comment.created_at}
                  tabIndex={0}
                  className="rounded-sm underline decoration-dotted underline-offset-2 outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                />
              }
            >
              {createdAt.fromNow()}
              <span className="sr-only">
                {` (${createdAt.format(PUBLIC_STORY_DETAIL_DATE_FORMAT)})`}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              {createdAt.format(PUBLIC_STORY_DETAIL_DATE_FORMAT)}
            </TooltipContent>
          </Tooltip>
        </ItemDescription>

        <If condition={isEditing}>
          <Then>
            <div className="mt-2">
              <PublicStoryCommentForm
                id={`comment-edit-${comment.id}`}
                label={isReply ? "Edit reply" : "Edit comment"}
                defaultContent={comment.content ?? ""}
                submitLabel="Save"
                isPending={updateMutation.isPending}
                autoFocus
                onCancel={() => setIsEditing(false)}
                onSubmit={(content) =>
                  updateMutation.mutateAsync({ ...ids, payload: { content } })
                }
              />
            </div>
          </Then>
          <Else>
            <If condition={comment.is_deleted}>
              <Then>
                <p className="mt-1 text-sm text-muted-foreground italic">
                  This comment was deleted.
                </p>
              </Then>
              <Else>
                {/* Plain text from the API; keep the author's line breaks */}
                <p className="mt-1 text-sm leading-relaxed break-words whitespace-pre-wrap text-foreground">
                  {leadingMention ? (
                    <>
                      <span className="rounded-sm bg-primary/10 px-0.5 font-medium">
                        {leadingMention}
                      </span>
                      {comment.content?.slice(leadingMention.length)}
                    </>
                  ) : (
                    comment.content
                  )}
                </p>
              </Else>
            </If>
          </Else>
        </If>

        {children}
      </ItemContent>

      <If condition={hasActions && !isEditing}>
        <Then>
          <ItemActions className="shrink-0 self-start">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={isBusy}
                    aria-label={`Actions for ${noun} by ${authorName}`}
                  >
                    {isBusy ? <Spinner /> : <EllipsisVertical />}
                  </Button>
                }
              />
              <DropdownMenuContent align="end" sideOffset={4}>
                <DropdownMenuGroup>
                  <If condition={actions.is_can_update}>
                    <Then>
                      <DropdownMenuItem onClick={() => setIsEditing(true)}>
                        <Pencil /> Edit
                      </DropdownMenuItem>
                    </Then>
                  </If>
                  <If condition={actions.is_can_pin}>
                    <Then>
                      <DropdownMenuItem onClick={() => pinMutation.mutate(ids)}>
                        <Pin /> Pin to top
                      </DropdownMenuItem>
                    </Then>
                  </If>
                  <If condition={actions.is_can_unpin}>
                    <Then>
                      <DropdownMenuItem
                        onClick={() => unpinMutation.mutate(ids)}
                      >
                        <PinOff /> Unpin
                      </DropdownMenuItem>
                    </Then>
                  </If>
                </DropdownMenuGroup>
                <If condition={actions.is_can_delete}>
                  <Then>
                    <If
                      condition={
                        actions.is_can_update ||
                        actions.is_can_pin ||
                        actions.is_can_unpin
                      }
                    >
                      <Then>
                        <DropdownMenuSeparator />
                      </Then>
                    </If>
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setIsDeleteDialogOpen(true)}
                      >
                        <Trash2 /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </Then>
                </If>
              </DropdownMenuContent>
            </DropdownMenu>
          </ItemActions>
        </Then>
      </If>

      <PublicStoryCommentDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        isPending={deleteMutation.isPending}
        noun={noun}
        onConfirm={() => {
          deleteMutation.mutate(ids);
          setIsDeleteDialogOpen(false);
        }}
      />
    </Item>
  );
}
