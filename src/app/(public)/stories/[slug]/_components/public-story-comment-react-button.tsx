"use client";

import { useState } from "react";
import { SmilePlus } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { cn } from "cn";
import { useT } from "@/app/_hooks/use-t";

import {
  PUBLIC_STORY_COMMENT_REACTIONS,
  PUBLIC_STORY_COMMENT_REACTION_LABEL_KEY,
} from "@/app/(public)/stories/[slug]/_constants/public-story-comment-reaction";
import { STORY_DETAIL_MESSAGES } from "@/app/(public)/stories/[slug]/_messages";
import type { TPublicStoryCommentReactButtonProps } from "@/app/(public)/stories/[slug]/_types/public-story-comment-react-button-props";

// Shown only while you can react and haven't yet: opens the picker. Once
// you have reacted it is hidden; undo is Remove on your row in the
// who-reacted dialog
export default function PublicStoryCommentReactButton({
  noun,
  isReply,
  onReact,
}: TPublicStoryCommentReactButtonProps) {
  const { t } = useT(STORY_DETAIL_MESSAGES);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

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
