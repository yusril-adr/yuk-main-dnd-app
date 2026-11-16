// content: plain text with at least one non-whitespace character, max 1000
export type TEventCommentCreatePayload = {
  content: string;
  // Reply target. Replies are one level deep: a reply to a reply is attached
  // to its top-level comment. 404 if the target is deleted or not in the event
  parent_id?: string;
};
