import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { createGuestUser } from "@/api/main/modules/master/iam/users/guests";
import type { TGuestUserCreatePayload } from "@/api/main/modules/master/iam/users/guests/types/guest-user-create-payload";
import type { TUserDetailResponse } from "@/api/main/modules/master/iam/users/[id]/types/user-detail-response";
import type { TMainApiResponse } from "@/api/main/types/response";
import { useT } from "@/app/_hooks/use-t";
import { MASTER_STORIES_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/_messages/shared";

export function useCreateGuestUser(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse<TMainApiResponse<TUserDetailResponse>>,
      Error,
      TGuestUserCreatePayload
    >,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_STORIES_SHARED_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: createGuestUser,
    onMutate: (...args) => {
      toast.loading(t("toast.creatingGuest"));
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(t("toast.guestCreated"));
      options?.onSuccess?.(...args);
    },
  });
}
