import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { cancelStoryById } from "@/api/main/modules/master/stories/[id]";
import { useT } from "@/app/_hooks/use-t";

import { MASTER_STORIES_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/_messages/shared";

// PATCH /:id/cancel (stories:update or the story's creator). A 400 (already
// cancelled, or archived) is already toasted by the axios interceptor
export function useCancelStoryById(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_STORIES_SHARED_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: (id: string) => cancelStoryById(id),
    onMutate: (...args) => {
      toast.loading(t("toast.cancelling"));
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(t("toast.cancelled"));
      options?.onSuccess?.(...args);
    },
  });
}
