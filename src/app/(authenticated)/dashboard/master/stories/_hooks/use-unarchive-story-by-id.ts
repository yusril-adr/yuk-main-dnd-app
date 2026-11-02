import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { unarchiveStoryById } from "@/api/main/modules/master/stories/[id]";
import { useT } from "@/app/_hooks/use-t";

import { MASTER_STORIES_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/_messages";

// PATCH /:id/unarchive (stories:update or the story's creator). A 400 (no
// previous status, e.g. archived before this feature) shows the API message
// as an error toast via the axios interceptor
export function useUnarchiveStoryById(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_STORIES_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: (id: string) => unarchiveStoryById(id),
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
