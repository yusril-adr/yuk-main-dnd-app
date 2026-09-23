import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import type { TPermissionResponse } from "./types/permission-response";
import type { TPermissionPaginationPayload } from "./types/permission-pagination-payload";

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
