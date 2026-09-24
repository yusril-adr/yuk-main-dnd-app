import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";
import { deleteRequestById } from "@/api/requestor/requests/[id]";

export function useDeleteRequestById(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: deleteRequestById,
    onMutate: (...args) => {
      toast.loading("Deleting request...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Request deleted");
      options?.onSuccess?.(...args);
    },
  });
}
