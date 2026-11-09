"use client";

import { useState } from "react";
import { SmilePlus } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { cn } from "cn";
import { useT } from "@/app/_hooks/use-t";

import {
  PUBLIC_STORY_COMMENT_REACTIONS,
  PUBLIC_STORY_COMMENT_REACTION_CHIP_CLASS_NAME,
  PUBLIC_STORY_COMMENT_REACTION_LABEL_KEY,
  PUBLIC_STORY_COMMENT_REACTION_MINE_CLASS_NAME,
} from "@/app/(public)/stories/[slug]/_constants/public-story-comment-reaction";
import { STORY_DETAIL_MESSAGES } from "@/app/(public)/stories/[slug]/_messages";
import { getPublicStoryCommentReactionOption } from "@/app/(public)/stories/[slug]/_utils/public-story-comment-reaction-option-helper";
import type { TPublicStoryCommentReactButtonProps } from "@/app/(public)/stories/[slug]/_types/public-story-comment-react-button-props";

// The only place to react or undo. Not reacted: SmilePlus opens the picker.
// Reacted: your emoji, highlighted; tapping it removes your reaction (to
// switch, remove it and pick again). So the picker only opens with no
// reaction set and has no "current" one to mark
export default function PublicStoryCommentReactButton({
  myReaction,
  noun,
  isReply,
  onReact,
}: TPublicStoryCommentReactButtonProps) {
  const { t } = useT(STORY_DETAIL_MESSAGES);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const mine =
    myReaction === null
      ? undefined
      : getPublicStoryCommentReactionOption(myReaction);

  if (mine) {
    const mineLabel = t(PUBLIC_STORY_COMMENT_REACTION_LABEL_KEY[mine.type]);
    return (
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              type="button"
              variant="outline"
              size="sm"
              aria-label={t("comments.removeYourReaction", {
                label: mineLabel,
              })}
              onClick={() => onReact(null)}
              className={cn(
                PUBLIC_STORY_COMMENT_REACTION_CHIP_CLASS_NAME,
                PUBLIC_STORY_COMMENT_REACTION_MINE_CLASS_NAME,
                "justify-center px-0",
                isReply ? "size-7" : "size-8",
              )}
            />
          }
        >
          <span
            aria-hidden
            className={cn("leading-none", isReply ? "text-sm" : "text-base")}
          >
            {mine.emoji}
          </span>
        </TooltipTrigger>
        <TooltipContent>{t("comments.tapToRemove")}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Popover open={isPickerOpen} onOpenChange={setIsPickerOpen}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={t("comments.reactAria", { noun })}
            title={t("comments.addReaction")}
            className={cn(
              "rounded-full text-muted-foreground hover:text-foreground",
              isReply && "size-7",
            )}
          />
        }
      >
        <SmilePlus />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="top"
        // Light: yellow emoji vanish on the parchment popover, so this
        // picker is a solid neutral white panel. Dark keeps the default
        className="w-auto flex-row gap-1 rounded-full bg-white p-1 shadow-md ring-1 ring-neutral-200 dark:bg-popover dark:ring-foreground/10"
      >
        {PUBLIC_STORY_COMMENT_REACTIONS.map((option) => {
          const optionLabel = t(
            PUBLIC_STORY_COMMENT_REACTION_LABEL_KEY[option.type],
          );
          return (
            <Button
              key={option.type}
              type="button"
              variant="ghost"
              size="icon-lg"
              aria-label={optionLabel}
              title={optionLabel}
              onClick={() => {
                onReact(option.type);
                setIsPickerOpen(false);
              }}
              className="rounded-full text-xl leading-none transition-transform hover:scale-110 hover:bg-neutral-100 dark:hover:bg-muted/50"
            >
              <span aria-hidden>{option.emoji}</span>
            </Button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
