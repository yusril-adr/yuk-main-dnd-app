import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";
import { updateRequestById } from "@/api/requestor/requests/[id]";
import type { TRequestUpdatePayload } from "@/api/requestor/requests/[id]/types/request-update-payload";

export function useUpdateRequestById(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse,
      Error,
      { id: string; payload: TRequestUpdatePayload }
    >,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: updateRequestById,
    onMutate: (...args) => {
      toast.loading("Updating request...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Request updated.");
      options?.onSuccess?.(...args);
    },
  });
}
