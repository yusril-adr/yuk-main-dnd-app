"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import CONFIG from "@/common/constants/config";
import StoryCreateForm from "./_components/story-create-form";
import { useCreateStory } from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-create-story";
import { useBannerUploadFile } from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-banner-upload-file";
import type { TStoryBannerUploadHandler } from "@/app/(authenticated)/dashboard/master/stories/_types/story-banner-upload-handler";
import { useT } from "@/app/_hooks/use-t";
import { MASTER_STORIES_CREATE_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/create/_messages";

export default function StoryCreatePageClient() {
  const { t } = useT(MASTER_STORIES_CREATE_MESSAGES);
  const router = useRouter();
  const queryClient = useQueryClient();
  const createStoryMutation = useCreateStory({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.STORY.ALL()],
      });
      router.push("/dashboard/master/stories");
    },
  });

  const { mutate: uploadBannerMutate, isPending: isUploadingBanner } =
    useBannerUploadFile();

  const onUploadBanner: TStoryBannerUploadHandler = useCallback(
    (file, { onSuccess, onError }) => {
      uploadBannerMutate(
        { file },
        { onSuccess: (response) => onSuccess(response.data.data.id), onError },
      );
    },
    [uploadBannerMutate],
  );

  return (
    <div className="w-full flex justify-center">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <AppBreadcrumb
          items={[
            {
              name: t("breadcrumb.stories"),
              link: "/dashboard/master/stories",
            },
            { name: t("breadcrumb.create") },
          ]}
        />

        <div className="flex items-center mt-4 mb-6 gap-x-2">
          <Link href="/dashboard/master/stories">
            <ArrowLeft />
          </Link>
          <h1 className="font-heading text-2xl">{t("title.create")}</h1>
        </div>

        <StoryCreateForm
          onSubmitPayload={createStoryMutation.mutate}
          mutationError={createStoryMutation.error}
          isPending={createStoryMutation.isPending}
          isPaused={createStoryMutation.isPaused}
          onUploadBanner={onUploadBanner}
          isUploadingBanner={isUploadingBanner}
        />
      </main>
    </div>
  );
}
