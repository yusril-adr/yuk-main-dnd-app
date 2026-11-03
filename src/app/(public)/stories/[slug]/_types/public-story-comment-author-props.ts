import type { TStoryCommentAuthor } from "@/api/main/types/entities/story/story-comment-entity";

export type TPublicStoryCommentAuthorProps = {
  author: TStoryCommentAuthor | null;
  // Tailwind size classes (reply rows are smaller)
  avatarSize: string;
  isReply: boolean;
  deletedLabel: string;
};
