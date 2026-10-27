// Per-comment flags from the caller's token; all false when logged out
export type TStoryCommentActionList = {
  // Author only
  is_can_update: boolean;
  // Author, story creator or stories:delete
  is_can_delete: boolean;
  // Story creator or stories:update, top-level comments only
  is_can_pin: boolean;
  is_can_unpin: boolean;
  // Logged in, story allows comments and the comment is not deleted
  is_can_react: boolean;
};
