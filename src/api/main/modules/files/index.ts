import type { AxiosResponse } from "axios";

import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import { TFileUploadPayload } from "./types/file-upload-payload";
import { TMainApiResponse } from "../../types/response";
import { TFileResponse } from "./types/file-response";

export const uploadFile = async (
  payload: TFileUploadPayload,
): Promise<AxiosResponse<TMainApiResponse<TFileResponse>>> => {
  const response = await mainAxios.post(
    MAIN_API_PATH.MASTER.IAM.USER.DEFAULT,
    payload,
  );

  return response;
};
