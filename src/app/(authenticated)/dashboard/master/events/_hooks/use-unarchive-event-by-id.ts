import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { unarchiveEventById } from "@/api/main/modules/master/events/[id]";
import { useT } from "@/app/_hooks/use-t";

import { MASTER_EVENTS_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/_messages/shared";

// PATCH /:id/unarchive (events:update or the event's creator). A 400 (no
// previous status, e.g. archived before this feature) shows the API message
// as an error toast via the axios interceptor
export function useUnarchiveEventById(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_EVENTS_SHARED_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: (id: string) => unarchiveEventById(id),
    onMutate: (...args) => {
      toast.loading(t("toast.unarchiving"));
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(t("toast.unarchived"));
      options?.onSuccess?.(...args);
    },
  });
}
