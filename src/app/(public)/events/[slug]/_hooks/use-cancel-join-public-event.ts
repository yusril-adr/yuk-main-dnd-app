import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { cancelJoinPublicEventById } from "@/api/main/modules/events/[id]";

// POST /events/:id/cancel-join. 400/401 are already toasted by the axios
// interceptor; a 404 is thrown as MainAPINotFoundError for the caller
export function useCancelJoinPublicEvent(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: (id: string) => cancelJoinPublicEventById(id),
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
