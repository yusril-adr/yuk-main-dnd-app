// content: plain text with at least one non-whitespace character, max 1000
export type TStoryCommentCreatePayload = {
  content: string;
  // Reply target (replies are one level deep)
  parent_id?: string;
};
