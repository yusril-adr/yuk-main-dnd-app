import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { publishStoryById } from "@/api/main/modules/master/stories/[id]";
import { useT } from "@/app/_hooks/use-t";

import { MASTER_STORIES_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/_messages";

// PATCH /:id/publish (stories:update or the story's creator). A 400 (not a
// draft) is already toasted by the axios interceptor
export function usePublishStoryById(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_STORIES_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: (id: string) => publishStoryById(id),
    onMutate: (...args) => {
      toast.loading(t("toast.publishing"));
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(t("toast.published"));
      options?.onSuccess?.(...args);
    },
  });
}
