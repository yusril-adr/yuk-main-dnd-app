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

