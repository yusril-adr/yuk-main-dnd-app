import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type {
  TMainApiPaginationResponse,
  TMainApiResponse,
} from "@/api/main/types/response";
import type { TEventCommentPaginationPayload } from "./types/event-comment-pagination-payload";
import type { TEventCommentPaginationResponse } from "./types/event-comment-pagination-response";
import type { TEventCommentReplyPaginationPayload } from "./types/event-comment-reply-pagination-payload";
import type { TEventCommentReplyPaginationResponse } from "./types/event-comment-reply-pagination-response";
import type { TEventCommentCreatePayload } from "./types/event-comment-create-payload";
import type { TEventCommentCreateResponse } from "./types/event-comment-create-response";
import type { TEventCommentUpdatePayload } from "./types/event-comment-update-payload";
import type { TEventCommentReactionPaginationPayload } from "./types/event-comment-reaction-pagination-payload";
import type { TEventCommentReactionPaginationResponse } from "./types/event-comment-reaction-pagination-response";
import type { TEventCommentReactionSetPayload } from "./types/event-comment-reaction-set-payload";

// Public, optional auth (the token fills action_list). Identifier is the id
// or slug. 404 unless the event is published or completed
export const getEventCommentPagination = async ({
  identifier,
  payload,
}: {
  identifier: string;
  payload: TEventCommentPaginationPayload;
}): Promise<
  AxiosResponse<TMainApiPaginationResponse<TEventCommentPaginationResponse>>
> => {
  const response = await mainAxios.get(
    MAIN_API_PATH.EVENT.COMMENTS(identifier),
    { params: payload },
  );
  return response;
};

// Public, optional auth. Replies of one top-level comment, oldest first. 404
// unless the event is public and commentId is a top-level comment of it (a
// deleted parent stays readable while it has replies)
export const getEventCommentReplyPagination = async ({
  identifier,
  commentId,
  payload,
}: {
  identifier: string;
  commentId: string;
  payload: TEventCommentReplyPaginationPayload;
}): Promise<
  AxiosResponse<
    TMainApiPaginationResponse<TEventCommentReplyPaginationResponse>
  >
> => {
  const response = await mainAxios.get(
    MAIN_API_PATH.EVENT.COMMENT_REPLIES(identifier, commentId),
    { params: payload },
  );
  return response;
};

// Any logged-in user. 400 unless the event is published or completed
export const createEventComment = async ({
  eventId,
  payload,
}: {
  eventId: string;
  payload: TEventCommentCreatePayload;
}): Promise<AxiosResponse<TMainApiResponse<TEventCommentCreateResponse>>> => {
  const response = await mainAxios.post(
    MAIN_API_PATH.EVENT.COMMENTS(eventId),
    payload,
  );
  return response;
};

// Author only, else 403
export const updateEventComment = async ({
  eventId,
  commentId,
  payload,
}: {
  eventId: string;
  commentId: string;
  payload: TEventCommentUpdatePayload;
}) => {
  const response = await mainAxios.patch(
    MAIN_API_PATH.EVENT.COMMENT(eventId, commentId),
    payload,
  );
  return response;
};

// Author, event creator or events:delete, else 403. Soft delete, 204
export const deleteEventComment = async ({
  eventId,
  commentId,
}: {
  eventId: string;
  commentId: string;
}) => {
  const response = await mainAxios.delete(
    MAIN_API_PATH.EVENT.COMMENT(eventId, commentId),
  );
  return response;
};

// Event creator or events:update, else 403. Idempotent. With the default
// limit of 1, pinning replaces the current pin
export const pinEventComment = async ({
  eventId,
  commentId,
}: {
  eventId: string;
  commentId: string;
}) => {
  const response = await mainAxios.patch(
    MAIN_API_PATH.EVENT.COMMENT_PIN(eventId, commentId),
  );
  return response;
};

// Same permission as pin. Idempotent
export const unpinEventComment = async ({
  eventId,
  commentId,
}: {
  eventId: string;
  commentId: string;
}) => {
  const response = await mainAxios.patch(
    MAIN_API_PATH.EVENT.COMMENT_UNPIN(eventId, commentId),
  );
  return response;
};

// Public. Who reacted to a comment or reply, newest first, optionally one
// type only. 404 unless the event is public and the comment is not deleted
export const getEventCommentReactionPagination = async ({
  identifier,
  commentId,
  payload,
}: {
  identifier: string;
  commentId: string;
  payload: TEventCommentReactionPaginationPayload;
}): Promise<
  AxiosResponse<
    TMainApiPaginationResponse<TEventCommentReactionPaginationResponse>
  >
> => {
  const response = await mainAxios.get(
    MAIN_API_PATH.EVENT.COMMENT_REACTIONS(identifier, commentId),
    { params: payload },
  );
  return response;
};

// Any logged-in user. One reaction per user per comment: a different type
// replaces it, the same type is a no-op. 200 with data null (no counts). 400
// unless the event is published or completed; 404 for a deleted comment
export const setEventCommentReaction = async ({
  eventId,
  commentId,
  payload,
}: {
  eventId: string;
  commentId: string;
  payload: TEventCommentReactionSetPayload;
}): Promise<AxiosResponse<TMainApiResponse<null>>> => {
  const response = await mainAxios.put(
    MAIN_API_PATH.EVENT.COMMENT_REACTION(eventId, commentId),
    payload,
  );
  return response;
};

// Removes the caller's reaction. Idempotent 204, no event status check
export const removeEventCommentReaction = async ({
  eventId,
  commentId,
}: {
  eventId: string;
  commentId: string;
}) => {
  const response = await mainAxios.delete(
    MAIN_API_PATH.EVENT.COMMENT_REACTION(eventId, commentId),
  );
  return response;
};
