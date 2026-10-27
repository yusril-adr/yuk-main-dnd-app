import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import CONFIG from "@/common/constants/config";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import MainAPIValidationError from "@/api/main/errors/validation-error";

// Shared success/error handling for the comment mutations
export function useRefreshPublicStoryComments() {
  const queryClient = useQueryClient();

  // Every loaded page and viewer variant. Pinning can also unpin another
  // comment (one pin per story by default), so the whole list refetches
  const refreshComments = () =>
    queryClient.invalidateQueries({
      queryKey: [CONFIG.QUERY_KEY.MAIN_API.STORY.COMMENT.ALL()],
    });

  const onCommentError = (error: Error) => {
    // Field errors are shown under the textarea by the form
    if (error instanceof MainAPIValidationError) return;
    // 404 is not toasted by the interceptor (story or comment gone)
    if (error instanceof MainAPINotFoundError) {
      toast.dismiss();
      toast.error(error.message || "This comment could not be found");
    }
    // 400 / 401 / 403 are toasted by the interceptor. Resync the story
    // (is_can_comment) and the comments (action_list); both sit under
    // STORY.ALL()
    queryClient.invalidateQueries({
      queryKey: [CONFIG.QUERY_KEY.MAIN_API.STORY.ALL()],
    });
  };

  return { refreshComments, onCommentError };
}
