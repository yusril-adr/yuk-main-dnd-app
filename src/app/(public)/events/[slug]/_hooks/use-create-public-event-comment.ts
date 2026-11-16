import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { createEventComment } from "@/api/main/modules/events/[id]/comments";
import type { TEventCommentCreatePayload } from "@/api/main/modules/events/[id]/comments/types/event-comment-create-payload";

// POST /events/:id/comments. 400 (string) / 401 are toasted by the axios interceptor; a field 400 is thrown as MainAPIValidationError and a 404 as MainAPINotFoundError for the caller
export function useCreatePublicEventComment(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse,
      Error,
      { eventId: string; payload: TEventCommentCreatePayload }
    >,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: createEventComment,
    onMutate: (...args) => {
      toast.loading(
        args[0].payload.parent_id ? "Posting reply..." : "Posting comment...",
      );
      return options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(
        args[1].payload.parent_id ? "Reply posted" : "Comment posted",
      );
      options?.onSuccess?.(...args);
    },
  });
}
