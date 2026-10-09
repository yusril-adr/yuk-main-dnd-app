import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { publishStoryById } from "@/api/main/modules/master/stories/[id]";

// PATCH /:id/publish (stories:update or the story's creator). A 400 (not a
// draft) is already toasted by the axios interceptor
export function usePublishStoryById(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: (id: string) => publishStoryById(id),
    onMutate: (...args) => {
      toast.loading("Publishing story...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Story published");
      options?.onSuccess?.(...args);
    },
  });
}
