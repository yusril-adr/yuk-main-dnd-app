import type { AxiosResponse } from "axios";
import type { TEventUpdatePayload } from "./types/event-update-payload";
import type { TCompleteEventPayload } from "./types/complete-event-payload";
import type { TEventDetailResponse } from "./types/event-detail-response";
import type { TMainApiResponse } from "@/api/main/types/response";
import { mainAxios } from "@/api/main/_libs/axios";
import MAIN_API_PATH from "@/api/main/_const/path";

// Needs events:view; id must be a UUID (400 otherwise)
export const getEventById = async (id: string) => {
  const response: AxiosResponse<TMainApiResponse<TEventDetailResponse>> =
    await mainAxios.get(MAIN_API_PATH.MASTER.EVENT.DETAIL(id));

  return response;
};

// 403 unless action_list.is_can_update (not cancelled or completed)
export const updateEventById = async ({
  id,
  payload,
}: {
  id: string;
  payload: TEventUpdatePayload;
}) => {
  const response = await mainAxios.patch(
    MAIN_API_PATH.MASTER.EVENT.DETAIL(id),
    payload,
  );
  return response;
};

// 204. 403 unless is_can_delete
export const deleteEventById = async (id: string) => {
  const response = await mainAxios.delete(
    MAIN_API_PATH.MASTER.EVENT.DETAIL(id),
  );

  return response;
};

// Saves the current status as the previous status, then sets archived
export const archiveEventById = async (id: string) => {
  const response = await mainAxios.patch(
    MAIN_API_PATH.MASTER.EVENT.ARCHIVE(id),
  );
  return response;
};

// Draft to published; 403 unless is_can_publish
export const publishEventById = async (id: string) => {
  const response = await mainAxios.patch(
    MAIN_API_PATH.MASTER.EVENT.PUBLISH(id),
  );
  return response;
};

// Restores the status saved before archiving; 403 when there is none
export const unarchiveEventById = async (id: string) => {
  const response = await mainAxios.patch(
    MAIN_API_PATH.MASTER.EVENT.UNARCHIVE(id),
  );
  return response;
};

// Published to cancelled; 403 unless is_can_cancel
export const cancelEventById = async (id: string) => {
  const response = await mainAxios.patch(MAIN_API_PATH.MASTER.EVENT.CANCEL(id));
  return response;
};

// Completes a published event and grants the rewards to the attended
// members; 403 unless is_can_complete, 400 for an empty user_ids
export const completeEventById = async ({
  id,
  payload,
}: {
  id: string;
  payload: TCompleteEventPayload;
}) => {
  const response = await mainAxios.patch(
    MAIN_API_PATH.MASTER.EVENT.COMPLETE(id),
    payload,
  );
  return response;
};
