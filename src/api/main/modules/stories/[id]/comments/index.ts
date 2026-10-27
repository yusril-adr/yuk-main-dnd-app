import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type {
  TMainApiPaginationResponse,
  TMainApiResponse,
} from "@/api/main/types/response";
import type { TStoryCommentPaginationPayload } from "./types/story-comment-pagination-payload";
import type { TStoryCommentPaginationResponse } from "./types/story-comment-pagination-response";
import type { TStoryCommentCreatePayload } from "./types/story-comment-create-payload";
import type { TStoryCommentCreateResponse } from "./types/story-comment-create-response";
import type { TStoryCommentUpdatePayload } from "./types/story-comment-update-payload";

// Public, optional auth (the token fills action_list). Identifier is the id
// or slug. 404 unless the story is published or completed
export const getStoryCommentPagination = async ({
  identifier,
  payload,
}: {
  identifier: string;
  payload: TStoryCommentPaginationPayload;
}): Promise<
  AxiosResponse<TMainApiPaginationResponse<TStoryCommentPaginationResponse>>
> => {
  const response = await mainAxios.get(
    MAIN_API_PATH.STORY.COMMENTS(identifier),
    { params: payload },
  );
  return response;
};

// Any logged-in user. 400 unless the story is published or completed
export const createStoryComment = async ({
  storyId,
  payload,
}: {
  storyId: string;
  payload: TStoryCommentCreatePayload;
}): Promise<AxiosResponse<TMainApiResponse<TStoryCommentCreateResponse>>> => {
  const response = await mainAxios.post(
    MAIN_API_PATH.STORY.COMMENTS(storyId),
    payload,
  );
  return response;
};

// Author only, else 403
export const updateStoryComment = async ({
  storyId,
  commentId,
  payload,
}: {
  storyId: string;
  commentId: string;
  payload: TStoryCommentUpdatePayload;
}) => {
  const response = await mainAxios.patch(
    MAIN_API_PATH.STORY.COMMENT(storyId, commentId),
    payload,
  );
  return response;
};

// Author, story creator or stories:delete, else 403. Soft delete, 204
export const deleteStoryComment = async ({
  storyId,
  commentId,
}: {
  storyId: string;
  commentId: string;
}) => {
  const response = await mainAxios.delete(
    MAIN_API_PATH.STORY.COMMENT(storyId, commentId),
  );
  return response;
};

// Story creator or stories:update, else 403. Idempotent. With the default
// limit of 1, pinning replaces the current pin
export const pinStoryComment = async ({
  storyId,
  commentId,
}: {
  storyId: string;
  commentId: string;
}) => {
  const response = await mainAxios.patch(
    MAIN_API_PATH.STORY.COMMENT_PIN(storyId, commentId),
  );
  return response;
};

// Same permission as pin. Idempotent
export const unpinStoryComment = async ({
  storyId,
  commentId,
}: {
  storyId: string;
  commentId: string;
}) => {
  const response = await mainAxios.patch(
    MAIN_API_PATH.STORY.COMMENT_UNPIN(storyId, commentId),
  );
  return response;
};
