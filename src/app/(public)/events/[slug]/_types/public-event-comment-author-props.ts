import type { TEventCommentAuthor } from "@/api/main/types/entities/event/event-comment-entity";

export type TPublicEventCommentAuthorProps = {
  author: TEventCommentAuthor | null;
  // Tailwind size classes (reply rows are smaller)
  avatarSize: string;
  isReply: boolean;
  deletedLabel: string;
};
