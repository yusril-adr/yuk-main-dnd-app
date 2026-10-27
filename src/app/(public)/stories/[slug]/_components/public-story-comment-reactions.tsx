"use client";

import { useState } from "react";
import { SmilePlus } from "lucide-react";
import { Else, If, Then } from "react-if";

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
import { cn } from "@/utils/cn";
import type { StoryCommentReactionTypeEnum } from "@/api/main/modules/stories/[id]/comments/enums/story-comment-reaction-type";

import { useReactPublicStoryComment } from "@/app/(public)/stories/[slug]/_hooks/use-react-public-story-comment";
import { useRefreshPublicStoryComments } from "@/app/(public)/stories/[slug]/_hooks/use-refresh-public-story-comments";
import { PUBLIC_STORY_COMMENT_REACTIONS } from "@/app/(public)/stories/[slug]/_constants/public-story-comment-reaction";
import { hasPublicStoryCommentReactions } from "@/app/(public)/stories/[slug]/_utils/public-story-comment-reaction-helper";
import type { TPublicStoryCommentReactionsProps } from "@/app/(public)/stories/[slug]/_types/public-story-comment-reactions-props";

const countLabel = (count: number) =>
  `${count} ${count === 1 ? "reaction" : "reactions"}`;

// Chips with counts (non-zero only) and an add button, at the start of the
// comment's action row (before Reply). Tapping your own
// reaction removes it, tapping another switches to it. Without is_can_react
// (logged out, closed story) the chips are read-only and there is no add
export default function PublicStoryCommentReactions({
  storyId,
  comment,
  isReply = false,
  className,
}: TPublicStoryCommentReactionsProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const { onCommentError } = useRefreshPublicStoryComments();
  const reactMutation = useReactPublicStoryComment(
    { storyId, commentId: comment.id, parentId: comment.parent_id },
    { onError: onCommentError },
  );

  const isCanReact = comment.action_list.is_can_react;
  const myReaction = comment.my_reaction;
  const chips = PUBLIC_STORY_COMMENT_REACTIONS.filter(
    (option) => comment.reaction_counts[option.countKey] > 0,
  );
  const noun = isReply ? "reply" : "comment";

  // Placeholders keep no reactions; nothing to show or do
  if (!hasPublicStoryCommentReactions(comment)) return null;

  const toggle = (type: StoryCommentReactionTypeEnum) =>
    reactMutation.mutate({ type: myReaction === type ? null : type });

  // Pills as tall as the row's xs Reply / thread buttons (h-6, text-xs),
  // on a faint darkening of whatever card sits behind them
  const chipClassName =
    "h-6 gap-1 rounded-full border border-border/60 bg-foreground/5 px-2.5 text-xs tabular-nums shadow-none dark:border-foreground/10 dark:bg-popover";
  const mineChipClassName =
    "border-primary/50 bg-primary/10 dark:border-primary/60 dark:bg-primary/15";

  return (
    <div
      role="group"
      aria-label={`Reactions to this ${noun}`}
      className={cn("flex flex-wrap items-center gap-1.5", className)}
    >
      {chips.map((option) => {
        const count = comment.reaction_counts[option.countKey];
        const isMine = myReaction === option.type;
        const label = `${option.label}, ${countLabel(count)}${isMine ? ", including yours" : ""}`;
        const content = (
          <>
            <span aria-hidden className="text-sm leading-none">
              {option.emoji}
            </span>
            <span aria-hidden className={cn(isMine && "font-bold")}>
              {count}
            </span>
          </>
        );
        return (
          <Tooltip key={option.type}>
            <If condition={isCanReact}>
              <Then>
                <TooltipTrigger
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      size="xs"
                      aria-pressed={isMine}
                      aria-label={label}
                      onClick={() => toggle(option.type)}
                      className={cn(
                        chipClassName,
                        "hover:bg-foreground/10 dark:hover:bg-muted/50",
                        isMine &&
                          cn(
                            mineChipClassName,
                            "hover:bg-primary/15 dark:hover:bg-primary/25",
                          ),
                      )}
                    />
                  }
                >
                  {content}
                </TooltipTrigger>
              </Then>
              <Else>
                <TooltipTrigger
                  render={
                    <span
                      role="img"
                      aria-label={label}
                      className={cn(
                        chipClassName,
                        "inline-flex items-center font-medium",
                        isMine && mineChipClassName,
                      )}
                    />
                  }
                >
                  {content}
                </TooltipTrigger>
              </Else>
            </If>
            <TooltipContent>
              {isMine && isCanReact
                ? `${option.label} (tap to remove)`
                : option.label}
            </TooltipContent>
          </Tooltip>
        );
      })}

      <If condition={isCanReact}>
        <Then>
          <Popover open={isPickerOpen} onOpenChange={setIsPickerOpen}>
            <PopoverTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label={`React to this ${noun}`}
                  title="Add reaction"
                  className="rounded-full"
                />
              }
            >
              <SmilePlus className="size-3.5" />
            </PopoverTrigger>
            <PopoverContent
              align="start"
              side="top"
              // Light: yellow emoji vanish on the parchment popover, so this
              // picker is a solid neutral white panel. Dark keeps the default
              className="w-auto flex-row gap-1 rounded-full bg-white p-1 shadow-md ring-1 ring-neutral-200 dark:bg-popover dark:ring-foreground/10"
            >
              {PUBLIC_STORY_COMMENT_REACTIONS.map((option) => {
                const isMine = myReaction === option.type;
                return (
                  <Button
                    key={option.type}
                    type="button"
                    variant="ghost"
                    size="icon-lg"
                    aria-pressed={isMine}
                    aria-label={
                      isMine ? `Remove ${option.label}` : option.label
                    }
                    title={option.label}
                    onClick={() => {
                      toggle(option.type);
                      setIsPickerOpen(false);
                    }}
                    className={cn(
                      "rounded-full text-xl leading-none transition-transform hover:scale-110 hover:bg-neutral-100 dark:hover:bg-muted/50",
                      isMine &&
                        "bg-neutral-100 ring-2 ring-primary/60 hover:bg-neutral-200/70 dark:bg-primary/15 dark:ring-primary/60 dark:hover:bg-primary/25",
                    )}
                  >
                    <span aria-hidden>{option.emoji}</span>
                  </Button>
                );
              })}
            </PopoverContent>
          </Popover>
        </Then>
      </If>
    </div>
  );
}
