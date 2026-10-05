import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { updateStoryById } from "@/api/main/modules/master/stories/[id]";
import type { TStoryUpdatePayload } from "@/api/main/modules/master/stories/[id]/types/story-update-payload";

export function useUpdateStoryById(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse,
      Error,
      { id: string; payload: TStoryUpdatePayload }
    >,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: updateStoryById,
    onMutate: (...args) => {
      toast.loading("Updating story...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Story updated");
      options?.onSuccess?.(...args);
    },
  });
}
