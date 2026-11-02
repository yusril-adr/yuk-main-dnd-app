import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { completeStoryById } from "@/api/main/modules/master/stories/[id]";
import type { TCompleteStoryPayload } from "@/api/main/modules/master/stories/[id]/types/complete-story-payload";
import { useT } from "@/app/_hooks/use-t";

import { MASTER_STORIES_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/_messages/shared";

// PATCH /:id/complete. user_ids are attended member ids and may be empty.
// A string 400 is already toasted by the axios interceptor. Do not toast again
// for that case.
export function useCompleteStoryById(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse,
      Error,
      { id: string; payload: TCompleteStoryPayload }
    >,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_STORIES_SHARED_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: completeStoryById,
    onMutate: (...args) => {
      toast.loading(t("toast.completing"));
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(t("toast.completed"));
      options?.onSuccess?.(...args);
    },
  });
}
