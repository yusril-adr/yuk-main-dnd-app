import type { TStoryCommentPaginationResponse } from "@/api/main/modules/stories/[id]/comments/types/story-comment-pagination-response";
import type { TStoryCommentReplyPaginationResponse } from "@/api/main/modules/stories/[id]/comments/types/story-comment-reply-pagination-response";
import type { TPublicStoryCommentReactorsTab } from "./public-story-comment-reactors-tab";

export type TPublicStoryCommentReactorsDialogProps = {
  storyId: string;
  comment:
    TStoryCommentPaginationResponse | TStoryCommentReplyPaginationResponse;
  noun: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tab: TPublicStoryCommentReactorsTab;
  onTabChange: (tab: TPublicStoryCommentReactorsTab) => void;
  // Removes the caller's reaction (the Remove button on their own row,
  // shown only while comment.action_list.is_can_react)
  onRemove: () => void;
  isRemoving: boolean;
};
