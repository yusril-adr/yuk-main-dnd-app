import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { deleteStoryById } from "@/api/main/modules/master/stories/[id]";

export function useDeleteStoryById(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: deleteStoryById,
    onMutate: (...args) => {
      toast.loading("Deleting story...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Story deleted");
      options?.onSuccess?.(...args);
    },
  });
}
