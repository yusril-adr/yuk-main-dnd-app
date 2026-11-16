import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { archiveEventById } from "@/api/main/modules/master/events/[id]";
import { useT } from "@/app/_hooks/use-t";

import { MASTER_EVENTS_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/_messages/shared";

// PATCH /:id/archive (events:update or the event's creator); the API keeps
// the current status so the event can be unarchived later
export function useArchiveEventById(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_EVENTS_SHARED_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: (id: string) => archiveEventById(id),
    onMutate: (...args) => {
      toast.loading(t("toast.archiving"));
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(t("toast.archived"));
      options?.onSuccess?.(...args);
    },
  });
}
