import type { TEventCommentCreatePayload } from "./event-comment-create-payload";

export type TEventCommentUpdatePayload = Pick<
  TEventCommentCreatePayload,
  "content"
>;
