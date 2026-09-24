import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";
import { createRequest } from "@/api/requestor/requests";
import type { TRequestCreatePayload } from "@/api/requestor/requests/types/request-create-payload";

export function useCreateRequest(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, TRequestCreatePayload>,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: createRequest,
    onMutate: (...args) => {
      toast.loading("Creating request...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Request created");
      options?.onSuccess?.(...args);
    },
  });
}
