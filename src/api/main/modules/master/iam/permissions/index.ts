import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type {
  TMainApiListResponse,
  TMainApiPaginationResponse,
} from "@/api/main/types/response";
import type { TPermissionResponse } from "./types/permission-response";
import type { TPermissionPaginationPayload } from "./types/permission-pagination-payload";
import { TPermissionFullListPayload } from "./types/permission-full-list-payload";

export const getPermissionPagination = async (
  payload: TPermissionPaginationPayload,
): Promise<AxiosResponse<TMainApiPaginationResponse<TPermissionResponse>>> => {
  const response = await mainAxios.get(
    MAIN_API_PATH.MASTER.IAM.PERMISSION.DEFAULT,
    {
      params: payload,
    },
  );

  return response;
};

export const getAllPermissions = async (
  payload: TPermissionFullListPayload,
): Promise<AxiosResponse<TMainApiListResponse<TPermissionResponse>>> => {
  const response = await mainAxios.get(
    MAIN_API_PATH.MASTER.IAM.PERMISSION.FULL,
    {
      params: payload,
    },
  );

  return response;
};
