import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";
import { createUser } from "@/api/requestor/users";
import type { TUserCreatePayload } from "@/api/requestor/users/types/user-create-payload";

export function useCreateUser(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, TUserCreatePayload>,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: createUser,
    onMutate: (...args) => {
      toast.loading("Creating user...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("User created");
      options?.onSuccess?.(...args);
    },
  });
}
