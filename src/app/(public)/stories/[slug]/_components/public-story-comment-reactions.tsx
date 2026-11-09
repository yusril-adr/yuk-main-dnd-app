"use client";

import { useState } from "react";
import { If, Then } from "react-if";

import { cn } from "cn";
import { useT } from "@/app/_hooks/use-t";

import PublicStoryCommentReactButton from "./public-story-comment-react-button";
import PublicStoryCommentReactionChip from "./public-story-comment-reaction-chip";
import PublicStoryCommentReactorsDialog from "./public-story-comment-reactors-dialog";
import { useReactPublicStoryComment } from "@/app/(public)/stories/[slug]/_hooks/use-react-public-story-comment";
import { useRefreshPublicStoryComments } from "@/app/(public)/stories/[slug]/_hooks/use-refresh-public-story-comments";
import {
  PUBLIC_STORY_COMMENT_REACTIONS,
  PUBLIC_STORY_COMMENT_REACTORS_ALL_TAB,
} from "@/app/(public)/stories/[slug]/_constants/public-story-comment-reaction";
import { STORY_DETAIL_MESSAGES } from "@/app/(public)/stories/[slug]/_messages";
import { hasPublicStoryCommentReactions } from "@/app/(public)/stories/[slug]/_utils/public-story-comment-reaction-helper";
import type { TPublicStoryCommentReactionsProps } from "@/app/(public)/stories/[slug]/_types/public-story-comment-reactions-props";
import type { TPublicStoryCommentReactorsTab } from "@/app/(public)/stories/[slug]/_types/public-story-comment-reactors-tab";

// Chips with counts (non-zero only) and the react button, at the start of
// the comment's action row (before Reply). Chips open who reacted, for
// everyone. The react button shows only while you can react and haven't
// (not logged out, closed story or already reacted); undo is Remove on your
// row in the who-reacted dialog
export default function PublicStoryCommentReactions({
  storyId,
  comment,
  isReply = false,
  className,
}: TPublicStoryCommentReactionsProps) {
  const { t } = useT(STORY_DETAIL_MESSAGES);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTab, setDialogTab] = useState<TPublicStoryCommentReactorsTab>(
    PUBLIC_STORY_COMMENT_REACTORS_ALL_TAB,
  );
  const { onCommentError } = useRefreshPublicStoryComments();
  const reactMutation = useReactPublicStoryComment(
    { storyId, commentId: comment.id, parentId: comment.parent_id },
    { onError: onCommentError },
  );

  const chips = PUBLIC_STORY_COMMENT_REACTIONS.filter(
    (option) => comment.reaction_counts[option.countKey] > 0,
  );
  const noun = t(isReply ? "comments.nounReply" : "comments.nounComment");

  // Placeholders keep no reactions; nothing to show or do
  if (!hasPublicStoryCommentReactions(comment)) return null;

  return (
    <div
      role="group"
      aria-label={t("comments.reactionsAria", { noun })}
      className={cn("flex flex-wrap items-center gap-1.5", className)}
    >
      {chips.map((option) => (
        <PublicStoryCommentReactionChip
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
          <PublicStoryCommentReactButton
            noun={noun}
            isReply={isReply}
            onReact={(type) => reactMutation.mutate({ type })}
          />
        </Then>
      </If>

      <PublicStoryCommentReactorsDialog
        storyId={storyId}
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
