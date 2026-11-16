import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { cancelEventById } from "@/api/main/modules/master/events/[id]";
import { useT } from "@/app/_hooks/use-t";

import { MASTER_EVENTS_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/_messages/shared";

// PATCH /:id/cancel (events:update or the event's creator). A 400 (already
// cancelled, or archived) is already toasted by the axios interceptor
export function useCancelEventById(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_EVENTS_SHARED_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: (id: string) => cancelEventById(id),
    onMutate: (...args) => {
      toast.loading(t("toast.cancelling"));
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(t("toast.cancelled"));
      options?.onSuccess?.(...args);
    },
  });
}
