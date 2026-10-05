import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { updateStoryById } from "@/api/main/modules/master/stories/[id]";
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";

// Archiving is a status-only update (PATCH, requires stories:update); other fields are left untouched
export function useArchiveStoryById(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: (id: string) =>
      updateStoryById({ id, payload: { status: StoryStatusEnum.ARCHIVED } }),
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
