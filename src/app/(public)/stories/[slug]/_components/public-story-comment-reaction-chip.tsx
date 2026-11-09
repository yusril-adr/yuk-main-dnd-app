"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { cn } from "cn";
import { useT } from "@/app/_hooks/use-t";

import {
  PUBLIC_STORY_COMMENT_REACTION_CHIP_CLASS_NAME,
  PUBLIC_STORY_COMMENT_REACTION_CHIP_REPLY_CLASS_NAME,
  PUBLIC_STORY_COMMENT_REACTION_LABEL_KEY,
  PUBLIC_STORY_COMMENT_REACTION_MINE_CLASS_NAME,
} from "@/app/(public)/stories/[slug]/_constants/public-story-comment-reaction";
import { STORY_DETAIL_MESSAGES } from "@/app/(public)/stories/[slug]/_messages";
import type { TPublicStoryCommentReactionChipProps } from "@/app/(public)/stories/[slug]/_types/public-story-comment-reaction-chip-props";

// Emoji and count. Tapping it opens who reacted (for everyone, logged out
// too); reacting lives on the react button only
export default function PublicStoryCommentReactionChip({
  option,
  count,
  isMine,
  isReply,
  onOpen,
}: TPublicStoryCommentReactionChipProps) {
  const { t } = useT(STORY_DETAIL_MESSAGES);
  const optionLabel = t(PUBLIC_STORY_COMMENT_REACTION_LABEL_KEY[option.type]);
  const countLabel = t(
    count === 1 ? "comments.reaction_one" : "comments.reaction_other",
    { count },
  );
  const label = `${option.emoji} ${optionLabel}, ${countLabel}${
    isMine ? t("comments.includingYours") : ""
  }, ${t("comments.seeWhoReacted")}`;

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-label={label}
            aria-haspopup="dialog"
            onClick={onOpen}
            className={cn(
              PUBLIC_STORY_COMMENT_REACTION_CHIP_CLASS_NAME,
              isReply
                ? PUBLIC_STORY_COMMENT_REACTION_CHIP_REPLY_CLASS_NAME
                : "h-8",
              isMine && PUBLIC_STORY_COMMENT_REACTION_MINE_CLASS_NAME,
            )}
          />
        }
      >
        <span
          aria-hidden
          className={cn("leading-none", isReply ? "text-sm" : "text-base")}
        >
          {option.emoji}
        </span>
        <span
          aria-hidden
          className={cn(
            isMine && "font-bold text-primary dark:text-foreground",
          )}
        >
          {count}
        </span>
      </TooltipTrigger>
      <TooltipContent>{optionLabel}</TooltipContent>
    </Tooltip>
  );
}
