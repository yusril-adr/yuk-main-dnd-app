import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { unpinStoryComment } from "@/api/main/modules/stories/[id]/comments";

// PATCH /stories/:id/comments/:commentId/unpin. 403 is toasted by the interceptor; a 404 is thrown as MainAPINotFoundError
export function useUnpinPublicStoryComment(
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
    mutationFn: unpinStoryComment,
    onMutate: (...args) => {
      toast.loading("Unpinning comment...");
      return options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Comment unpinned");
      options?.onSuccess?.(...args);
    },
  });
}
