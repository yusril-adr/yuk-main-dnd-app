import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { createStoryComment } from "@/api/main/modules/stories/[id]/comments";
import type { TStoryCommentCreatePayload } from "@/api/main/modules/stories/[id]/comments/types/story-comment-create-payload";

// POST /stories/:id/comments. 400 (string) / 401 are toasted by the axios interceptor; a field 400 is thrown as MainAPIValidationError and a 404 as MainAPINotFoundError for the caller
export function useCreatePublicStoryComment(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse,
      Error,
      { storyId: string; payload: TStoryCommentCreatePayload }
    >,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: createStoryComment,
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
