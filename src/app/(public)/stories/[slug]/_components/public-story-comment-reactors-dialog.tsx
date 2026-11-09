"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { useT } from "@/app/_hooks/use-t";

import PublicStoryCommentReactorList from "./public-story-comment-reactor-list";
import {
  PUBLIC_STORY_COMMENT_REACTIONS,
  PUBLIC_STORY_COMMENT_REACTION_LABEL_KEY,
  PUBLIC_STORY_COMMENT_REACTORS_ALL_TAB,
} from "@/app/(public)/stories/[slug]/_constants/public-story-comment-reaction";
import { STORY_DETAIL_MESSAGES } from "@/app/(public)/stories/[slug]/_messages";
import type { TPublicStoryCommentReactorsDialogProps } from "@/app/(public)/stories/[slug]/_types/public-story-comment-reactors-dialog-props";
import type { TPublicStoryCommentReactorsTab } from "@/app/(public)/stories/[slug]/_types/public-story-comment-reactors-tab";

// Who reacted: an All tab plus one tab per type that has reactions. Counts
// come from the comment, so they follow the optimistic reaction state
export default function PublicStoryCommentReactorsDialog({
  storyId,
  comment,
  noun,
  open,
  onOpenChange,
  tab,
  onTabChange,
  onRemove,
  isRemoving,
}: TPublicStoryCommentReactorsDialogProps) {
  const { t } = useT(STORY_DETAIL_MESSAGES);
  const isCanReact = comment.action_list.is_can_react;
  const options = PUBLIC_STORY_COMMENT_REACTIONS.filter(
    (option) => comment.reaction_counts[option.countKey] > 0,
  );
  const countLabel = (count: number) =>
    t(count === 1 ? "comments.reaction_one" : "comments.reaction_other", {
      count,
    });
  // A type whose last reaction was removed loses its tab; fall back to All
  const activeTab: TPublicStoryCommentReactorsTab = options.some(
    (option) => option.type === tab,
  )
    ? tab
    : PUBLIC_STORY_COMMENT_REACTORS_ALL_TAB;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-4">
        <DialogHeader>
          <DialogTitle>{t("comments.reactorsTitle")}</DialogTitle>
          <DialogDescription className="sr-only">
            {t("comments.reactorsDescription", { noun })}
          </DialogDescription>
        </DialogHeader>
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            onTabChange(value as TPublicStoryCommentReactorsTab)
          }
          className="min-w-0 gap-3"
        >
          <TabsList variant="line" className="w-full justify-start border-b">
            <TabsTrigger
              value={PUBLIC_STORY_COMMENT_REACTORS_ALL_TAB}
              aria-label={`${t("comments.reactorsAll")}, ${countLabel(
                comment.reaction_count,
              )}`}
              className="flex-none tabular-nums"
            >
              {t("comments.reactorsAll")}
              <span className="text-muted-foreground">
                {comment.reaction_count}
              </span>
            </TabsTrigger>
            {options.map((option) => {
              const count = comment.reaction_counts[option.countKey];
              return (
                <TabsTrigger
                  key={option.type}
                  value={option.type}
                  aria-label={`${t(
                    PUBLIC_STORY_COMMENT_REACTION_LABEL_KEY[option.type],
                  )}, ${countLabel(count)}`}
                  className="flex-none tabular-nums"
                >
                  <span aria-hidden className="text-base leading-none">
                    {option.emoji}
                  </span>
                  <span aria-hidden>{count}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          <TabsContent value={PUBLIC_STORY_COMMENT_REACTORS_ALL_TAB}>
            <PublicStoryCommentReactorList
              storyId={storyId}
              commentId={comment.id}
              isCanReact={isCanReact}
              onRemove={onRemove}
              isRemoving={isRemoving}
            />
          </TabsContent>
          {options.map((option) => (
            <TabsContent key={option.type} value={option.type}>
              <PublicStoryCommentReactorList
                storyId={storyId}
                commentId={comment.id}
                type={option.type}
                isCanReact={isCanReact}
                onRemove={onRemove}
                isRemoving={isRemoving}
              />
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
