import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { pinEventComment } from "@/api/main/modules/events/[id]/comments";

// PATCH /events/:id/comments/:commentId/pin. 400/403 are toasted by the interceptor; a 404 is thrown as MainAPINotFoundError
export function usePinPublicEventComment(
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
    mutationFn: pinEventComment,
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
