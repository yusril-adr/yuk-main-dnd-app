import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { linkGuestUser } from "@/api/main/modules/master/iam/users/guests/[id]";
import type { TGuestUserLinkPayload } from "@/api/main/modules/master/iam/users/guests/[id]/types/guest-user-link-payload";
import type { TUserDetailResponse } from "@/api/main/modules/master/iam/users/[id]/types/user-detail-response";
import type { TMainApiResponse } from "@/api/main/types/response";
import { useT } from "@/app/_hooks/use-t";
import { MASTER_USERS_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/iam/users/_messages/shared";

export function useLinkGuestUser(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse<TMainApiResponse<TUserDetailResponse>>,
      Error,
      { id: string; payload: TGuestUserLinkPayload }
    >,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_USERS_SHARED_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: linkGuestUser,
    onMutate: (...args) => {
      toast.loading(t("toast.linking"));
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(t("toast.linked"));
      options?.onSuccess?.(...args);
    },
  });
}
