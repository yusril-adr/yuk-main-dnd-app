import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { uploadFile } from "@/api/main/modules/files";
import { FilePurposesEnum } from "@/api/main/modules/files/enums/file-upload-purpose";
import type { TFileUploadPayload } from "@/api/main/modules/files/types/file-upload-payload";
import type { TFileResponse } from "@/api/main/modules/files/types/file-response";
import type { TMainApiResponse } from "@/api/main/types/response";

// Local copy of the IAM avatar-upload hook so Settings does not import from
// the users/_hooks folder
export function useSettingsAvatarUpload(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse<TMainApiResponse<TFileResponse>>,
      Error,
      Omit<TFileUploadPayload, "purpose">
    >,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: (payload) =>
      uploadFile({ ...payload, purpose: FilePurposesEnum.USER_AVATAR }),
    onMutate: (...args) => {
      toast.loading("Uploading avatar...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Avatar uploaded");
      options?.onSuccess?.(...args);
    },
  });
}
