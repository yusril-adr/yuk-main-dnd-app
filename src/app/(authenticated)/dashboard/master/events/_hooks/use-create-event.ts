import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { createEvent } from "@/api/main/modules/master/events";
import type { TEventCreatePayload } from "@/api/main/modules/master/events/types/event-create-payload";
import { useT } from "@/app/_hooks/use-t";
import { MASTER_EVENTS_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/_messages/shared";

export function useCreateEvent(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, TEventCreatePayload>,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_EVENTS_SHARED_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: createEvent,
    onMutate: (...args) => {
      toast.loading(t("toast.creating"));
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(t("toast.created"));
      options?.onSuccess?.(...args);
    },
  });
}
