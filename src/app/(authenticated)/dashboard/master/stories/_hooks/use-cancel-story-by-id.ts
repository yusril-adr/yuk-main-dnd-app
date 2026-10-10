import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { cancelStoryById } from "@/api/main/modules/master/stories/[id]";

// PATCH /:id/cancel (stories:update or the story's creator). A 400 (already
// cancelled, or archived) is already toasted by the axios interceptor
export function useCancelStoryById(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: (id: string) => cancelStoryById(id),
    onMutate: (...args) => {
      toast.loading("Cancelling story...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Story cancelled");
      options?.onSuccess?.(...args);
    },
  });
}
