import type { TStoryCommentCreatePayload } from "./story-comment-create-payload";

export type TStoryCommentUpdatePayload = Pick<
  TStoryCommentCreatePayload,
  "content"
>;
