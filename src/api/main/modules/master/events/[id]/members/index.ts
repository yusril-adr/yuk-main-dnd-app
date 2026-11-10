import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import type { TEventMembersUserIdsPayload } from "./types/event-members-user-ids-payload";
import type { TEventMemberPaginationPayload } from "./types/event-member-pagination-payload";
import type { TEventMemberPaginationResponse } from "./types/event-member-pagination-response";

// 201. 403 unless is_can_add_members; 409 when a user is already a member
export const addEventMembers = async ({
  id,
  payload,
}: {
  id: string;
  payload: TEventMembersUserIdsPayload;
}) => {
  const response = await mainAxios.post(
    MAIN_API_PATH.MASTER.EVENT.MEMBERS(id),
    payload,
  );
  return response;
};

// 204. JSON body must be axios config.data. A bare second argument is not the body.
export const deleteEventMembers = async ({
  id,
  payload,
}: {
  id: string;
  payload: TEventMembersUserIdsPayload;
}) => {
  const response = await mainAxios.delete(
    MAIN_API_PATH.MASTER.EVENT.MEMBERS(id),
    { data: payload },
  );
  return response;
};

// Needs events:view
export const getEventMemberPagination = async ({
  id,
  payload,
}: {
  id: string;
  payload: TEventMemberPaginationPayload;
}): Promise<
  AxiosResponse<TMainApiPaginationResponse<TEventMemberPaginationResponse>>
> => {
  const response = await mainAxios.get(MAIN_API_PATH.MASTER.EVENT.MEMBERS(id), {
    params: payload,
  });
  return response;
};
