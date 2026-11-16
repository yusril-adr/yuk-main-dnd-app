import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { updateEventComment } from "@/api/main/modules/events/[id]/comments";
import type { TEventCommentUpdatePayload } from "@/api/main/modules/events/[id]/comments/types/event-comment-update-payload";

// PATCH /events/:id/comments/:commentId. 403 is toasted by the interceptor; a field 400 is thrown as MainAPIValidationError and a 404 as MainAPINotFoundError
export function useUpdatePublicEventComment(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse,
      Error,
      {
        eventId: string;
        commentId: string;
        payload: TEventCommentUpdatePayload;
      }
    >,
    "mutationFn"
  >,
  isReply = false,
) {
  return useMutation({
    ...options,
    mutationFn: updateEventComment,
    onMutate: (...args) => {
      toast.loading(isReply ? "Saving reply..." : "Saving comment...");
      return options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(isReply ? "Reply updated" : "Comment updated");
      options?.onSuccess?.(...args);
    },
  });
}
