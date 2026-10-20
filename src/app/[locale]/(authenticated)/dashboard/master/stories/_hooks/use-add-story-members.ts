import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { addStoryMembers } from "@/api/main/modules/master/stories/[id]/members";
import type { TStoryMembersUserIdsPayload } from "@/api/main/modules/master/stories/[id]/members/types/story-members-user-ids-payload";

// POST /:id/members (stories:update or the story's creator).
// user_ids is required and non-empty. Soft-deleted members are restored as REGISTERED.
export function useAddStoryMembers(
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
    mutationFn: addStoryMembers,
    onMutate: (...args) => {
      toast.loading("Adding story members...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Story members added");
      options?.onSuccess?.(...args);
    },
  });
}
