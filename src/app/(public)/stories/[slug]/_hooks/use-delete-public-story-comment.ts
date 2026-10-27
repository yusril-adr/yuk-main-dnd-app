import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { deleteStoryComment } from "@/api/main/modules/stories/[id]/comments";

// DELETE /stories/:id/comments/:commentId. 403 is toasted by the interceptor; a 404 is thrown as MainAPINotFoundError
export function useDeletePublicStoryComment(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse,
      Error,
      { storyId: string; commentId: string }
    >,
    "mutationFn"
  >,
  isReply = false,
) {
  return useMutation({
    ...options,
    mutationFn: deleteStoryComment,
    onMutate: (...args) => {
      toast.loading(isReply ? "Deleting reply..." : "Deleting comment...");
      return options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(isReply ? "Reply deleted" : "Comment deleted");
      options?.onSuccess?.(...args);
    },
  });
}
