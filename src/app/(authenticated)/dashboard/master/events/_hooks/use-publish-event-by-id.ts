import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { publishEventById } from "@/api/main/modules/master/events/[id]";
import { useT } from "@/app/_hooks/use-t";

import { MASTER_EVENTS_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/_messages/shared";

// PATCH /:id/publish (events:update or the event's creator). A 400 (not a
// draft) is already toasted by the axios interceptor
export function usePublishEventById(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_EVENTS_SHARED_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: (id: string) => publishEventById(id),
    onMutate: (...args) => {
      toast.loading(t("toast.publishing"));
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(t("toast.published"));
      options?.onSuccess?.(...args);
    },
  });
}
