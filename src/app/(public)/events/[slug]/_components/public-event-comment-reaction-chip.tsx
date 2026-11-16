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
  PUBLIC_EVENT_COMMENT_REACTION_CHIP_CLASS_NAME,
  PUBLIC_EVENT_COMMENT_REACTION_CHIP_REPLY_CLASS_NAME,
  PUBLIC_EVENT_COMMENT_REACTION_LABEL_KEY,
  PUBLIC_EVENT_COMMENT_REACTION_MINE_CLASS_NAME,
} from "@/app/(public)/events/[slug]/_constants/public-event-comment-reaction";
import { EVENT_DETAIL_MESSAGES } from "@/app/(public)/events/[slug]/_messages";
import type { TPublicEventCommentReactionChipProps } from "@/app/(public)/events/[slug]/_types/public-event-comment-reaction-chip-props";

// Emoji and count. Tapping it opens who reacted (for everyone, logged out
// too); reacting lives on the react button only
export default function PublicEventCommentReactionChip({
  option,
  count,
  isMine,
  isReply,
  onOpen,
}: TPublicEventCommentReactionChipProps) {
  const { t } = useT(EVENT_DETAIL_MESSAGES);
  const optionLabel = t(PUBLIC_EVENT_COMMENT_REACTION_LABEL_KEY[option.type]);
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
              PUBLIC_EVENT_COMMENT_REACTION_CHIP_CLASS_NAME,
              isReply
                ? PUBLIC_EVENT_COMMENT_REACTION_CHIP_REPLY_CLASS_NAME
                : "h-8",
              isMine && PUBLIC_EVENT_COMMENT_REACTION_MINE_CLASS_NAME,
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
