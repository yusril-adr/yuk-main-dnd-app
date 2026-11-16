// Per-comment flags from the caller's token; all false when logged out
export type TEventCommentActionList = {
  // Author only
  is_can_update: boolean;
  // Author, event creator or events:delete
  is_can_delete: boolean;
  // Event creator or events:update, top-level comments only
  is_can_pin: boolean;
  is_can_unpin: boolean;
  // Logged in, event allows comments and the comment is not deleted
  is_can_react: boolean;
};
