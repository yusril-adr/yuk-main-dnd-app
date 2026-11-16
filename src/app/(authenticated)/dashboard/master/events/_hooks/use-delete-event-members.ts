import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { deleteEventMembers } from "@/api/main/modules/master/events/[id]/members";
import type { TEventMembersUserIdsPayload } from "@/api/main/modules/master/events/[id]/members/types/event-members-user-ids-payload";
import { useT } from "@/app/_hooks/use-t";

import { MASTER_EVENTS_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/_messages/shared";

// DELETE /:id/members (events:update or the event's creator).
// user_ids is required and non-empty. Matching rows are soft-removed.
export function useDeleteEventMembers(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse,
      Error,
      { id: string; payload: TEventMembersUserIdsPayload }
    >,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_EVENTS_SHARED_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: deleteEventMembers,
    onMutate: (...args) => {
      toast.loading(t("toast.removingMembers"));
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(t("toast.membersRemoved"));
      options?.onSuccess?.(...args);
    },
  });
}
