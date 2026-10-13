import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { cancelJoinPublicStoryById } from "@/api/main/modules/stories/[id]";

// POST /stories/:id/cancel-join. 400/401 are already toasted by the axios
// interceptor; a 404 is thrown as MainAPINotFoundError for the caller
export function useCancelJoinPublicStory(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: (id: string) => cancelJoinPublicStoryById(id),
    onMutate: (...args) => {
      toast.loading("Leaving the party...");
      return options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("You have left the party");
      options?.onSuccess?.(...args);
    },
  });
}
