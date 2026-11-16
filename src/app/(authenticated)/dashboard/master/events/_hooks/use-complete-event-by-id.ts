import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { completeEventById } from "@/api/main/modules/master/events/[id]";
import type { TCompleteEventPayload } from "@/api/main/modules/master/events/[id]/types/complete-event-payload";
import { useT } from "@/app/_hooks/use-t";

import { MASTER_EVENTS_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/_messages/shared";

// PATCH /:id/complete. user_ids are attended member ids and must not be empty
// (400 when they are). A string 400 is already toasted by the axios interceptor.
export function useCompleteEventById(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse,
      Error,
      { id: string; payload: TCompleteEventPayload }
    >,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_EVENTS_SHARED_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: completeEventById,
    onMutate: (...args) => {
      toast.loading(t("toast.completing"));
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(t("toast.completed"));
      options?.onSuccess?.(...args);
    },
  });
}
