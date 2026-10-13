import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { joinPublicStoryById } from "@/api/main/modules/stories/[id]";

// POST /stories/:id/join. 400/401/409 are already toasted by the axios
// interceptor; a 404 is thrown as MainAPINotFoundError for the caller
export function useJoinPublicStory(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: (id: string) => joinPublicStoryById(id),
    onMutate: (...args) => {
      toast.loading("Joining the party...");
      return options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Welcome to the party, adventurer!");
      options?.onSuccess?.(...args);
    },
  });
}
