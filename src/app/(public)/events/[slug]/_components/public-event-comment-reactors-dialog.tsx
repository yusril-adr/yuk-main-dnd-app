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

import PublicEventCommentReactorList from "./public-event-comment-reactor-list";
import {
  PUBLIC_EVENT_COMMENT_REACTIONS,
  PUBLIC_EVENT_COMMENT_REACTION_LABEL_KEY,
  PUBLIC_EVENT_COMMENT_REACTORS_ALL_TAB,
} from "@/app/(public)/events/[slug]/_constants/public-event-comment-reaction";
import { EVENT_DETAIL_MESSAGES } from "@/app/(public)/events/[slug]/_messages";
import type { TPublicEventCommentReactorsDialogProps } from "@/app/(public)/events/[slug]/_types/public-event-comment-reactors-dialog-props";
import type { TPublicEventCommentReactorsTab } from "@/app/(public)/events/[slug]/_types/public-event-comment-reactors-tab";

// Who reacted: an All tab plus one tab per type that has reactions. Counts
// come from the comment, so they follow the optimistic reaction state
export default function PublicEventCommentReactorsDialog({
  eventId,
  comment,
  noun,
  open,
  onOpenChange,
  tab,
  onTabChange,
  onRemove,
  isRemoving,
}: TPublicEventCommentReactorsDialogProps) {
  const { t } = useT(EVENT_DETAIL_MESSAGES);
  const isCanReact = comment.action_list.is_can_react;
  const options = PUBLIC_EVENT_COMMENT_REACTIONS.filter(
    (option) => comment.reaction_counts[option.countKey] > 0,
  );
  const countLabel = (count: number) =>
    t(count === 1 ? "comments.reaction_one" : "comments.reaction_other", {
      count,
    });
  // A type whose last reaction was removed loses its tab; fall back to All
  const activeTab: TPublicEventCommentReactorsTab = options.some(
    (option) => option.type === tab,
  )
    ? tab
    : PUBLIC_EVENT_COMMENT_REACTORS_ALL_TAB;

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
            onTabChange(value as TPublicEventCommentReactorsTab)
          }
          className="min-w-0 gap-3"
        >
          <TabsList variant="line" className="w-full justify-start border-b">
            <TabsTrigger
              value={PUBLIC_EVENT_COMMENT_REACTORS_ALL_TAB}
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
                    PUBLIC_EVENT_COMMENT_REACTION_LABEL_KEY[option.type],
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
          <TabsContent value={PUBLIC_EVENT_COMMENT_REACTORS_ALL_TAB}>
            <PublicEventCommentReactorList
              eventId={eventId}
              commentId={comment.id}
              myReaction={comment.my_reaction}
              isCanReact={isCanReact}
              onRemove={onRemove}
              isRemoving={isRemoving}
            />
          </TabsContent>
          {options.map((option) => (
            <TabsContent key={option.type} value={option.type}>
              <PublicEventCommentReactorList
                eventId={eventId}
                commentId={comment.id}
                type={option.type}
                myReaction={comment.my_reaction}
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
