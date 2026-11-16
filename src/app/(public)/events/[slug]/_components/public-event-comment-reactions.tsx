"use client";

import { useState } from "react";
import { If, Then } from "react-if";

import { cn } from "cn";
import { useT } from "@/app/_hooks/use-t";

import PublicEventCommentReactButton from "./public-event-comment-react-button";
import PublicEventCommentReactionChip from "./public-event-comment-reaction-chip";
import PublicEventCommentReactorsDialog from "./public-event-comment-reactors-dialog";
import { useReactPublicEventComment } from "@/app/(public)/events/[slug]/_hooks/use-react-public-event-comment";
import { useRefreshPublicEventComments } from "@/app/(public)/events/[slug]/_hooks/use-refresh-public-event-comments";
import {
  PUBLIC_EVENT_COMMENT_REACTIONS,
  PUBLIC_EVENT_COMMENT_REACTORS_ALL_TAB,
} from "@/app/(public)/events/[slug]/_constants/public-event-comment-reaction";
import { EVENT_DETAIL_MESSAGES } from "@/app/(public)/events/[slug]/_messages";
import { hasPublicEventCommentReactions } from "@/app/(public)/events/[slug]/_utils/public-event-comment-reaction-helper";
import type { TPublicEventCommentReactionsProps } from "@/app/(public)/events/[slug]/_types/public-event-comment-reactions-props";
import type { TPublicEventCommentReactorsTab } from "@/app/(public)/events/[slug]/_types/public-event-comment-reactors-tab";

// Chips with counts (non-zero only) and the react button, at the start of
// the comment's action row (before Reply). Chips open who reacted, for
// everyone. The react button shows only while you can react and haven't
// (not logged out, closed event or already reacted); undo is Remove on your
// row in the who-reacted dialog
export default function PublicEventCommentReactions({
  eventId,
  comment,
  isReply = false,
  className,
}: TPublicEventCommentReactionsProps) {
  const { t } = useT(EVENT_DETAIL_MESSAGES);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTab, setDialogTab] = useState<TPublicEventCommentReactorsTab>(
    PUBLIC_EVENT_COMMENT_REACTORS_ALL_TAB,
  );
  const { onCommentError } = useRefreshPublicEventComments();
  const reactMutation = useReactPublicEventComment(
    { eventId, commentId: comment.id, parentId: comment.parent_id },
    { onError: onCommentError },
  );

  const chips = PUBLIC_EVENT_COMMENT_REACTIONS.filter(
    (option) => comment.reaction_counts[option.countKey] > 0,
  );
  const noun = t(isReply ? "comments.nounReply" : "comments.nounComment");

  // Placeholders keep no reactions; nothing to show or do
  if (!hasPublicEventCommentReactions(comment)) return null;

  return (
    <div
      role="group"
      aria-label={t("comments.reactionsAria", { noun })}
      className={cn("flex flex-wrap items-center gap-1.5", className)}
    >
      {chips.map((option) => (
        <PublicEventCommentReactionChip
          key={option.type}
          option={option}
          count={comment.reaction_counts[option.countKey]}
          isMine={comment.my_reaction === option.type}
          isReply={isReply}
          onOpen={() => {
            setDialogTab(option.type);
            setIsDialogOpen(true);
          }}
        />
      ))}

      <If
        condition={
          comment.action_list.is_can_react && comment.my_reaction === null
        }
      >
        <Then>
          <PublicEventCommentReactButton
            noun={noun}
            isReply={isReply}
            onReact={(type) => reactMutation.mutate({ type })}
          />
        </Then>
      </If>

      <PublicEventCommentReactorsDialog
        eventId={eventId}
        comment={comment}
        noun={noun}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        tab={dialogTab}
        onTabChange={setDialogTab}
        onRemove={() => reactMutation.mutate({ type: null })}
        isRemoving={reactMutation.isPending}
      />
    </div>
  );
}
