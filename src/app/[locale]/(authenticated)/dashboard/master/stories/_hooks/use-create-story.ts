import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { createStory } from "@/api/main/modules/master/stories";
import type { TStoryCreatePayload } from "@/api/main/modules/master/stories/types/story-create-payload";

export function useCreateStory(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, TStoryCreatePayload>,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: createStory,
    onMutate: (...args) => {
      toast.loading("Creating story...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Story created");
      options?.onSuccess?.(...args);
    },
  });
}
