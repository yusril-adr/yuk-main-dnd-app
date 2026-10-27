import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { pinStoryComment } from "@/api/main/modules/stories/[id]/comments";

// PATCH /stories/:id/comments/:commentId/pin. 400/403 are toasted by the interceptor; a 404 is thrown as MainAPINotFoundError
export function usePinPublicStoryComment(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse,
      Error,
      { storyId: string; commentId: string }
    >,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: pinStoryComment,
    onMutate: (...args) => {
      toast.loading("Pinning comment...");
      return options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Comment pinned");
      options?.onSuccess?.(...args);
    },
  });
}
