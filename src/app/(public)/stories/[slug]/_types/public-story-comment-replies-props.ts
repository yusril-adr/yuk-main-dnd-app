import type { TStoryCommentPaginationResponse } from "@/api/main/modules/stories/[id]/comments/types/story-comment-pagination-response";

export type TPublicStoryCommentRepliesProps = {
  storyId: string;
  // Top-level comment that owns the thread
  comment: TStoryCommentPaginationResponse;
  // Logged in and the story accepts comments (story action_list)
  isCanReply: boolean;
};
