import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import type { TStoryMembersUserIdsPayload } from "./types/story-members-user-ids-payload";
import type { TStoryMemberPaginationPayload } from "./types/story-member-pagination-payload";
import type { TStoryMemberResponse } from "./types/story-member-response";

export const addStoryMembers = async ({
  id,
  payload,
}: {
  id: string;
  payload: TStoryMembersUserIdsPayload;
}) => {
  const response = await mainAxios.post(
    MAIN_API_PATH.MASTER.STORY.MEMBERS(id),
    payload,
  );
  return response;
};

// JSON body must be axios config.data. A bare second argument is not the body.
export const deleteStoryMembers = async ({
  id,
  payload,
}: {
  id: string;
  payload: TStoryMembersUserIdsPayload;
}) => {
  const response = await mainAxios.delete(
    MAIN_API_PATH.MASTER.STORY.MEMBERS(id),
    { data: payload },
  );
  return response;
};

export const getStoryMemberPagination = async ({
  id,
  payload,
}: {
  id: string;
  payload: TStoryMemberPaginationPayload;
}): Promise<AxiosResponse<TMainApiPaginationResponse<TStoryMemberResponse>>> => {
  const response = await mainAxios.get(
    MAIN_API_PATH.MASTER.STORY.MEMBERS(id),
    { params: payload },
  );
  return response;
};
