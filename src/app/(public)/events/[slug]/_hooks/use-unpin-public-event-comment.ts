import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { unpinEventComment } from "@/api/main/modules/events/[id]/comments";

// PATCH /events/:id/comments/:commentId/unpin. 403 is toasted by the interceptor; a 404 is thrown as MainAPINotFoundError
export function useUnpinPublicEventComment(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse,
      Error,
      { eventId: string; commentId: string }
    >,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: unpinEventComment,
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
