"use client";

import { useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import StoryEditForm from "./_components/story-edit-form";
import { useGetStoryById } from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-get-story-by-id";
import { useUpdateStoryById } from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-update-story-by-id";
import { useBannerUploadFile } from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-banner-upload-file";
import type { TStoryBannerUploadHandler } from "@/app/(authenticated)/dashboard/master/stories/_types/story-banner-upload-handler";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import CONFIG from "@/common/constants/config";
import { useT } from "@/app/_hooks/use-t";
import { MASTER_STORIES_EDIT_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/[id]/edit/_messages";

export default function StoryEditPageClient() {
  const { t } = useT(MASTER_STORIES_EDIT_MESSAGES);
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const storyId = id as string;
  const storyQuery = useGetStoryById(storyId);
  const updateStoryMutation = useUpdateStoryById({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.STORY.ALL()],
      });
      router.push(`/dashboard/master/stories/${storyId}`);
    },
    onError: (error) => {
      if (error instanceof MainAPINotFoundError) {
        router.push("/dashboard/master/stories");
      }
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
  const story = storyQuery.data?.data?.data;
  const isCompletedEditBlocked =
    !!story &&
    !story.action_list.is_can_update &&
    story.status === StoryStatusEnum.COMPLETED;
  const isEditForbidden = !!story && !story.action_list.is_can_update;

  useEffect(() => {
    if (
      storyQuery.isError &&
      storyQuery.error instanceof MainAPINotFoundError
    ) {
      notFound();
    }
  }, [storyQuery.error, storyQuery.isError, router]);

  useEffect(() => {
    if (!isEditForbidden) {
      return;
    }

    toast.error(
      isCompletedEditBlocked
        ? t("toast.completedBlocked")
        : t("toast.editForbidden"),
    );
    router.replace(`/dashboard/master/stories/${storyId}`);
  }, [isCompletedEditBlocked, isEditForbidden, router, storyId, t]);

  return (
    <div className="w-full flex justify-center">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <AppBreadcrumb
          items={[
            {
              name: t("breadcrumb.stories"),
              link: "/dashboard/master/stories",
            },
            ...(story
              ? [
                  {
                    name: story.title,
                    link: `/dashboard/master/stories/${storyId}`,
                  },
                ]
              : []),
            { name: t("breadcrumb.edit") },
          ]}
        />

        <div className="flex items-center mt-4 mb-6 gap-x-2">
          <Link href={`/dashboard/master/stories/${storyId}`}>
            <ArrowLeft />
          </Link>
          <h1 className="font-heading text-2xl">{t("title.edit")}</h1>
        </div>

        <StoryEditForm
          story={story}
          isLoading={storyQuery.isLoading || isEditForbidden}
          onSubmitPayload={(payload) =>
            updateStoryMutation.mutate({ id: storyId, payload })
          }
          mutationError={updateStoryMutation.error}
          isPending={updateStoryMutation.isPending}
          isPaused={updateStoryMutation.isPaused}
          onUploadBanner={onUploadBanner}
          isUploadingBanner={isUploadingBanner}
        />
      </main>
    </div>
  );
}
