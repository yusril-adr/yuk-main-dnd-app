import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { archiveStoryById } from "@/api/main/modules/master/stories/[id]";
import { useT } from "@/app/_hooks/use-t";

import { MASTER_STORIES_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/_messages/shared";

// PATCH /:id/archive (stories:update or the story's creator); the API keeps
// the current status so the story can be unarchived later
export function useArchiveStoryById(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_STORIES_SHARED_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: (id: string) => archiveStoryById(id),
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
