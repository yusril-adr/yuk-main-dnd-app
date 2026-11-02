import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { deleteStoryMembers } from "@/api/main/modules/master/stories/[id]/members";
import type { TStoryMembersUserIdsPayload } from "@/api/main/modules/master/stories/[id]/members/types/story-members-user-ids-payload";
import { useT } from "@/app/_hooks/use-t";

import { MASTER_STORIES_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/_messages/shared";

// DELETE /:id/members (stories:update or the story's creator).
// user_ids is required and non-empty. Matching rows are soft-removed.
export function useDeleteStoryMembers(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse,
      Error,
      { id: string; payload: TStoryMembersUserIdsPayload }
    >,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_STORIES_SHARED_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: deleteStoryMembers,
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
