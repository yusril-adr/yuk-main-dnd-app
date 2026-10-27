import type { TBaseEntity } from "../base-entity";

export type TStoryCommentAuthor = {
  id: string;
  // Soft-deleted users get " (Deleted User)" appended
  display_name: string;
  username: string | null;
  avatar_url: string | null;
};

// Shared by top-level comments and replies. A deleted comment that still has
// replies comes back as a placeholder: is_deleted true, content and author
// null. Without replies it is not returned at all.
export type TStoryCommentEntity = TBaseEntity & {
  // null for top-level comments; replies point at their top-level comment
  parent_id: string | null;
  is_deleted: boolean;
  content: string | null;
  is_pinned: boolean;
  pinned_at: string | null;
  author: TStoryCommentAuthor | null;
};
