import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type {
  TMainApiListResponse,
  TMainApiPaginationResponse,
} from "@/api/main/types/response";
import type { TPermissionPaginationResponse } from "./types/permission-pagination-response";
import type { TPermissionPaginationPayload } from "./types/permission-pagination-payload";
import { TPermissionFullListPayload } from "./types/permission-full-list-payload";
import { TPermissionFullListResponse } from "./types/permission-full-list-response";

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

export const getAllPermissions = async (
  payload: TPermissionFullListPayload,
): Promise<
  AxiosResponse<TMainApiListResponse<TPermissionFullListResponse>>
> => {
  const response = await mainAxios.get(
    MAIN_API_PATH.MASTER.IAM.PERMISSION.FULL,
    {
      params: payload,
    },
  );

  return response;
};
