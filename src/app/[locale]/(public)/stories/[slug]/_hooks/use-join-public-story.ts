import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { joinPublicStoryById } from "@/api/main/modules/stories/[id]";

// POST /stories/:id/join. 400/401/409 are already toasted by the axios
// interceptor; a 404 is thrown as MainAPINotFoundError for the caller
export function useJoinPublicStory(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  const t = useTranslations("storyDetail.join.toast");

  return useMutation({
    ...options,
    mutationFn: (id: string) => joinPublicStoryById(id),
    onMutate: (...args) => {
      toast.loading(t("joining"));
      return options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(t("joined"));
      options?.onSuccess?.(...args);
    },
  });
}
