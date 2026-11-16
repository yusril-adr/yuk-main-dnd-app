import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { deleteEventComment } from "@/api/main/modules/events/[id]/comments";

// DELETE /events/:id/comments/:commentId. 403 is toasted by the interceptor; a 404 is thrown as MainAPINotFoundError
export function useDeletePublicEventComment(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse,
      Error,
      { eventId: string; commentId: string }
    >,
    "mutationFn"
  >,
  isReply = false,
) {
  return useMutation({
    ...options,
    mutationFn: deleteEventComment,
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
