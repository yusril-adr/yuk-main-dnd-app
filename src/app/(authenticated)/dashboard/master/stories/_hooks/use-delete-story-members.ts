import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { deleteStoryMembers } from "@/api/main/modules/master/stories/[id]/members";
import type { TStoryMembersUserIdsPayload } from "@/api/main/modules/master/stories/[id]/members/types/story-members-user-ids-payload";

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
  return useMutation({
    ...options,
    mutationFn: deleteStoryMembers,
    onMutate: (...args) => {
      toast.loading("Removing story members...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Story members removed");
      options?.onSuccess?.(...args);
    },
  });
}
