import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { createStory } from "@/api/main/modules/master/stories";
import type { TStoryCreatePayload } from "@/api/main/modules/master/stories/types/story-create-payload";
import { useT } from "@/app/_hooks/use-t";
import { MASTER_STORIES_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/_components/_messages";

export function useCreateStory(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, TStoryCreatePayload>,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_STORIES_SHARED_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: createStory,
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
