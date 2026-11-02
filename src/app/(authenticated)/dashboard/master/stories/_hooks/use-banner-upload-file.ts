import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { uploadFile } from "@/api/main/modules/files";
import { FilePurposesEnum } from "@/api/main/modules/files/enums/file-upload-purpose";
import type { TFileUploadPayload } from "@/api/main/modules/files/types/file-upload-payload";
import type { TFileResponse } from "@/api/main/modules/files/types/file-response";
import type { TMainApiResponse } from "@/api/main/types/response";
import { useT } from "@/app/_hooks/use-t";
import { MASTER_STORIES_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/_messages/shared";

export function useBannerUploadFile(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse<TMainApiResponse<TFileResponse>>,
      Error,
      Omit<TFileUploadPayload, "purpose">
    >,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_STORIES_SHARED_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: (payload) =>
      uploadFile({ ...payload, purpose: FilePurposesEnum.STORY_BANNER }),
    onMutate: (...args) => {
      toast.loading(t("toast.uploadingBanner"));
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(t("toast.bannerUploaded"));
      options?.onSuccess?.(...args);
    },
  });
}
