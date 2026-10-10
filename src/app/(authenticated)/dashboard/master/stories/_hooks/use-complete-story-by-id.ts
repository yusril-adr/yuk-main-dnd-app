import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { completeStoryById } from "@/api/main/modules/master/stories/[id]";
import type { TCompleteStoryPayload } from "@/api/main/modules/master/stories/[id]/types/complete-story-payload";

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
  return useMutation({
    ...options,
    mutationFn: completeStoryById,
    onMutate: (...args) => {
      toast.loading("Completing story...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Story completed");
      options?.onSuccess?.(...args);
    },
  });
}
