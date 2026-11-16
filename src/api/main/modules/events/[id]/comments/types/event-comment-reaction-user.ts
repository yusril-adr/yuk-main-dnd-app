// Reactor of a comment. A deleted user stays listed, with " (Deleted User)"
// appended to display_name
export type TEventCommentReactionUser = {
  id: string;
  display_name: string;
  username?: string | null;
  avatar_url: string | null;
  is_guest: boolean;
};
