import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import type { TRolePaginationPayload } from "./types/role-pagination-payload";
import type { TRolePaginationResponse } from "./types/role-pagination-response";
import type { TRoleOptionsPayload } from "./types/role-options-payload";
import type { TRoleOptionResponse } from "./types/role-options-response";
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
): Promise<
  AxiosResponse<TMainApiPaginationResponse<TRolePaginationResponse>>
> => {
  const response = await mainAxios.get(MAIN_API_PATH.MASTER.IAM.ROLE.DEFAULT, {
    params: payload,
  });

  return response;
};

export const getRoleOptions = async (
  payload: TRoleOptionsPayload,
): Promise<AxiosResponse<TMainApiPaginationResponse<TRoleOptionResponse>>> => {
  const response = await mainAxios.get(MAIN_API_PATH.MASTER.IAM.ROLE.OPTIONS, {
    params: payload,
  });

  return response;
};
