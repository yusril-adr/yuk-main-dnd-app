import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { archiveStoryById } from "@/api/main/modules/master/stories/[id]";

// PATCH /:id/archive (stories:update or the story's creator); the API keeps
// the current status so the story can be unarchived later
export function useArchiveStoryById(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: (id: string) => archiveStoryById(id),
    onMutate: (...args) => {
      toast.loading("Archiving story...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Story archived");
      options?.onSuccess?.(...args);
    },
  });
}
