import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { updateStoryComment } from "@/api/main/modules/stories/[id]/comments";
import type { TStoryCommentUpdatePayload } from "@/api/main/modules/stories/[id]/comments/types/story-comment-update-payload";

// PATCH /stories/:id/comments/:commentId. 403 is toasted by the interceptor; a field 400 is thrown as MainAPIValidationError and a 404 as MainAPINotFoundError
export function useUpdatePublicStoryComment(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse,
      Error,
      {
        storyId: string;
        commentId: string;
        payload: TStoryCommentUpdatePayload;
      }
    >,
    "mutationFn"
  >,
  isReply = false,
) {
  return useMutation({
    ...options,
    mutationFn: updateStoryComment,
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
