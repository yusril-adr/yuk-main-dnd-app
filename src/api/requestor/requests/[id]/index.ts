import MAIN_API_PATH from "@/api/requestor/_const/path";
import { mainAxios } from "@/api/requestor/_libs/axios";
import type { AxiosResponse } from "axios";
import type { TRequestorApiResponse } from "@/api/requestor/types/response";
import type { TRequestResponse } from "@/api/requestor/requests/types/request-response";
import type { TRequestUpdatePayload } from "@/api/requestor/requests/[id]/types/request-update-payload";

export const getRequestById = async (id: string) => {
  const response: AxiosResponse<TRequestorApiResponse<TRequestResponse>> =
    await mainAxios.get(MAIN_API_PATH.REQUEST.DETAIL(id));

  return response;
};

export const updateRequestById = async ({
  id,
  payload,
}: {
  id: string;
  payload: TRequestUpdatePayload;
}) => {
  const response = await mainAxios.patch(
    MAIN_API_PATH.REQUEST.DETAIL(id),
    payload,
  );
  return response;
};

export const deleteRequestById = async (id: string) => {
  const response = await mainAxios.delete(MAIN_API_PATH.REQUEST.DETAIL(id));

  return response;
};
