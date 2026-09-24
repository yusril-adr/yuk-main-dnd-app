import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import type { TRolePaginationPayload } from "./types/role-pagination-payload";
import type { TRoleResponse } from "./types/role-response";
import { TRoleCreatePayload } from "./types/role-create-payload";

export const createRole = async (payload: TRoleCreatePayload) => {
  const response = await mainAxios.post(
    MAIN_API_PATH.MASTER.IAM.ROLE.DEFAULT,
    payload,
  );

  return response;
};

export const getRolePagination = async (
  payload: TRolePaginationPayload,
): Promise<AxiosResponse<TMainApiPaginationResponse<TRoleResponse>>> => {
  const response = await mainAxios.get(MAIN_API_PATH.MASTER.IAM.ROLE.DEFAULT, {
    params: payload,
  });

  return response;
};
