import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { updateEventById } from "@/api/main/modules/master/events/[id]";
import type { TEventUpdatePayload } from "@/api/main/modules/master/events/[id]/types/event-update-payload";
import { useT } from "@/app/_hooks/use-t";
import { MASTER_EVENTS_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/_messages/shared";

export function useUpdateEventById(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse,
      Error,
      { id: string; payload: TEventUpdatePayload }
    >,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_EVENTS_SHARED_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: updateEventById,
    onMutate: (...args) => {
      toast.loading(t("toast.updating"));
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(t("toast.updated"));
      options?.onSuccess?.(...args);
    },
  });
}
