import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";
import { deleteUserById } from "@/api/main/modules/master/iam/users/[id]";

export function useDeleteUserById(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: deleteUserById,
    onMutate: (...args) => {
      toast.loading("Deleting user...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("User deleted");
      options?.onSuccess?.(...args);
    },
  });
}