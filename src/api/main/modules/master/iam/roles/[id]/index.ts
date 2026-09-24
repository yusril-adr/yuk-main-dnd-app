import type { AxiosResponse } from "axios";
import { TRoleUpdatePayload } from "./types/role-update-payload";
import { TMainApiResponse } from "@/api/main/types/response";
import { TRoleResponse } from "../types/role-response";
import { mainAxios } from "@/api/main/_libs/axios";
import MAIN_API_PATH from "@/api/main/_const/path";

export const getRoleById = async (id: string) => {
  const response: AxiosResponse<TMainApiResponse<TRoleResponse>> =
    await mainAxios.get(MAIN_API_PATH.MASTER.IAM.ROLE.DETAIL(id));

  return response;
};

export const updateRoleById = async ({
  id,
  payload,
}: {
  id: string;
  payload: TRoleUpdatePayload;
}) => {
  const response = await mainAxios.patch(
    MAIN_API_PATH.MASTER.IAM.ROLE.DETAIL(id),
    payload,
  );
  return response;
};

export const deleteRoleById = async (id: string) => {
  const response = await mainAxios.delete(
    MAIN_API_PATH.MASTER.IAM.ROLE.DETAIL(id),
  );

  return response;
};
