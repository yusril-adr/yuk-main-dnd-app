"use client";

import { useState } from "react";
import {
  EllipsisVertical,
  Pencil,
  Pin,
  PinOff,
  Trash2,
} from "lucide-react";
import { Else, If, Then } from "react-if";

import { Badge } from "@/app/_components/ui/badge";
import RichTextContent from "@/app/_components/rich-text-content";
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
} from "@/app/_components/ui/item";
import { Spinner } from "@/app/_components/ui/spinner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { cn } from "cn";
import dayjs from "@/libs/dayjs";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";
import PublicEventCommentForm from "./public-event-comment-form";
import PublicEventCommentAuthor from "./public-event-comment-author";
import PublicEventCommentDeleteDialog from "./public-event-comment-delete-dialog";
import { useUpdatePublicEventComment } from "@/app/(public)/events/[slug]/_hooks/use-update-public-event-comment";
import { useDeletePublicEventComment } from "@/app/(public)/events/[slug]/_hooks/use-delete-public-event-comment";
import { usePinPublicEventComment } from "@/app/(public)/events/[slug]/_hooks/use-pin-public-event-comment";
import { useUnpinPublicEventComment } from "@/app/(public)/events/[slug]/_hooks/use-unpin-public-event-comment";
import { useRefreshPublicEventComments } from "@/app/(public)/events/[slug]/_hooks/use-refresh-public-event-comments";
import { PUBLIC_EVENT_DETAIL_DATE_FORMAT } from "@/app/(public)/events/[slug]/_constants/public-event-detail-date-format";
import { EVENT_DETAIL_MESSAGES } from "@/app/(public)/events/[slug]/_messages";
import type { TPublicEventCommentItemProps } from "@/app/(public)/events/[slug]/_types/public-event-comment-item-props";

export default function PublicEventCommentItem({
  eventId,
  comment,
  isReply = false,
  children,
}: TPublicEventCommentItemProps) {
  const { t } = useT(EVENT_DETAIL_MESSAGES);
  const { locale } = useLocale();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { refreshComments, onCommentError } = useRefreshPublicEventComments();

  const mutationOptions = {
    onSuccess: refreshComments,
    onError: onCommentError,
  };
  const updateMutation = useUpdatePublicEventComment(
    {
      ...mutationOptions,
      onSuccess: () => {
        setIsEditing(false);
        refreshComments();
      },
    },
    isReply,
  );
  const deleteMutation = useDeletePublicEventComment(mutationOptions, isReply);
  const pinMutation = usePinPublicEventComment(mutationOptions);
  const unpinMutation = useUnpinPublicEventComment(mutationOptions);

  const { author, action_list: actions } = comment;
  const isPinBusy = pinMutation.isPending || unpinMutation.isPending;
  const isBusy =
    isPinBusy || deleteMutation.isPending || updateMutation.isPending;
  const hasActions =
    actions.is_can_update ||
    actions.is_can_delete ||
    actions.is_can_pin ||
    actions.is_can_unpin;
  const ids = { eventId, commentId: comment.id };
  const authorName = author?.display_name ?? t("comments.deletedAuthor");
  const noun = t(isReply ? "comments.nounReply" : "comments.nounComment");
  // Smaller below sm so nested replies keep a readable text column
  const avatarSize = isReply ? "size-6 sm:size-8" : "size-8 sm:size-10";
  const createdAt = dayjs(comment.created_at).locale(locale);

  return (
    <Item
      role="listitem"
      variant={isReply ? "default" : "outline"}
      size="sm"
      className={cn(
        "items-start gap-x-2 gap-y-1 bg-background px-2.5 sm:gap-x-2.5 sm:px-3",
        // Thread rows sit inside the parent card, so no border or padding
        isReply && "bg-transparent px-0 py-1.5 sm:px-0",
        isBusy && "opacity-70",
      )}
    >
      <ItemContent className="min-w-0 gap-1">
        <div className="flex min-w-0 flex-wrap items-start gap-x-2 gap-y-1">
          <PublicEventCommentAuthor
            author={author}
            avatarSize={avatarSize}
            isReply={isReply}
            deletedLabel={authorName}
          />
          <If condition={comment.is_pinned}>
            <Then>
              <Badge
                variant="secondary"
                className="gap-1 rounded-sm text-primary shadow-none"
              >
                <Pin className="size-3" aria-hidden /> {t("comments.pinned")}
              </Badge>
            </Then>
          </If>
        </div>
        {/* Relative time; tap, click or hover shows the absolute date (also read by screen readers) */}
        <ItemDescription
          className={cn(
            "line-clamp-none flex flex-wrap items-baseline gap-x-1 text-xs text-foreground/70",
            isReply ? "ps-8 sm:ps-10.5" : "ps-10 sm:ps-12.5",
          )}
        >
          <Popover>
            <PopoverTrigger
              openOnHover
              delay={300}
              className="cursor-pointer rounded-sm whitespace-nowrap underline decoration-dotted underline-offset-2 outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <time dateTime={comment.created_at}>{createdAt.fromNow()}</time>
              <span className="sr-only">
                {` (${createdAt.format(PUBLIC_EVENT_DETAIL_DATE_FORMAT)})`}
              </span>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              className="w-auto gap-0 px-2.5 py-1.5 text-xs"
            >
              {createdAt.format(PUBLIC_EVENT_DETAIL_DATE_FORMAT)}
            </PopoverContent>
          </Popover>
        </ItemDescription>

        <If condition={isEditing}>
          <Then>
            <div
              className={cn(
                "mt-2",
                isReply ? "ps-8 sm:ps-10.5" : "ps-10 sm:ps-12.5",
              )}
            >
              <PublicEventCommentForm
                id={`comment-edit-${comment.id}`}
                label={t(
                  isReply ? "comments.editReply" : "comments.editComment",
                )}
                defaultContent={comment.content ?? ""}
                submitLabel={t("comments.save")}
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
                <p
                  className={cn(
                    "mt-1 text-base text-muted-foreground italic",
                    isReply ? "ps-8 sm:ps-10.5" : "ps-10 sm:ps-12.5",
                  )}
                >
                  {t("comments.deletedBody")}
                </p>
              </Then>
              <Else>
                {/* Markdown from the API: bold, italic, strikethrough and
                    lists only, anything else shows as written. Replies
                    highlight a leading "@username" */}
                <RichTextContent
                  variant="comment"
                  value={comment.content ?? ""}
                  highlightLeadingMention={isReply}
                  className={cn(
                    "mt-1 text-base text-foreground [&_p]:my-1.5",
                    isReply ? "ps-8 sm:ps-10.5" : "ps-10 sm:ps-12.5",
                  )}
                />
              </Else>
            </If>
          </Else>
        </If>
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
                    aria-label={t("comments.actionsAria", { noun, name: authorName })}
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
                        <Pencil /> {t("comments.edit")}
                      </DropdownMenuItem>
                    </Then>
                  </If>
                  <If condition={actions.is_can_pin}>
                    <Then>
                      <DropdownMenuItem onClick={() => pinMutation.mutate(ids)}>
                        <Pin /> {t("comments.pin")}
                      </DropdownMenuItem>
                    </Then>
                  </If>
                  <If condition={actions.is_can_unpin}>
                    <Then>
                      <DropdownMenuItem
                        onClick={() => unpinMutation.mutate(ids)}
                      >
                        <PinOff /> {t("comments.unpin")}
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
                        <Trash2 /> {t("comments.delete")}
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </Then>
                </If>
              </DropdownMenuContent>
            </DropdownMenu>
          </ItemActions>
        </Then>
      </If>

      {/* Own row so threads use the full card width on phones; sm+ indents under the text column */}
      <If condition={!!children}>
        <Then>
          <div
            className={cn(
              "min-w-0 basis-full",
              isReply ? "ps-8 sm:ps-10.5" : "sm:ps-12.5",
            )}
          >
            {children}
          </div>
        </Then>
      </If>

      <PublicEventCommentDeleteDialog
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
