import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type {
  TMainApiListResponse,
  TMainApiPaginationResponse,
} from "@/api/main/types/response";
import type { TPermissionPaginationResponse } from "./types/permission-pagination-response";
import type { TPermissionPaginationPayload } from "./types/permission-pagination-payload";
import type { TPermissionOptionsPayload } from "./types/permission-options-payload";
import type { TPermissionOptionResponse } from "./types/permission-options-response";

export const getPermissionPagination = async (
  payload: TPermissionPaginationPayload,
): Promise<
  AxiosResponse<TMainApiPaginationResponse<TPermissionPaginationResponse>>
> => {
  const response = await mainAxios.get(
    MAIN_API_PATH.MASTER.IAM.PERMISSION.DEFAULT,
    {
      params: payload,
    },
  );

  return response;
};

export const getPermissionOptions = async (
  payload: TPermissionOptionsPayload,
): Promise<AxiosResponse<TMainApiListResponse<TPermissionOptionResponse>>> => {
  const response = await mainAxios.get(
    MAIN_API_PATH.MASTER.IAM.PERMISSION.OPTIONS,
    {
      params: payload,
    },
  );

  return response;
};
