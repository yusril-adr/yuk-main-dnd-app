"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import CONFIG from "@/common/constants/config";
import EventCreateForm from "./_components/event-create-form";
import { useCreateEvent } from "@/app/(authenticated)/dashboard/master/events/_hooks/use-create-event";
import { useBannerUploadFile } from "@/app/(authenticated)/dashboard/master/events/_hooks/use-banner-upload-file";
import type { TEventBannerUploadHandler } from "@/app/(authenticated)/dashboard/master/events/_types/event-banner-upload-handler";
import { useT } from "@/app/_hooks/use-t";
import { MASTER_EVENTS_CREATE_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/create/_messages";

export default function EventCreatePageClient() {
  const { t } = useT(MASTER_EVENTS_CREATE_MESSAGES);
  const router = useRouter();
  const queryClient = useQueryClient();
  const createEventMutation = useCreateEvent({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.EVENT.ALL()],
      });
      router.push("/dashboard/master/events");
    },
  });

  const { mutate: uploadBannerMutate, isPending: isUploadingBanner } =
    useBannerUploadFile();

  const onUploadBanner: TEventBannerUploadHandler = useCallback(
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
              name: t("breadcrumb.events"),
              link: "/dashboard/master/events",
            },
            { name: t("breadcrumb.create") },
          ]}
        />

        <div className="flex items-center mt-4 mb-6 gap-x-2">
          <Link href="/dashboard/master/events">
            <ArrowLeft />
          </Link>
          <h1 className="font-heading text-2xl">{t("title.create")}</h1>
        </div>

        <EventCreateForm
          onSubmitPayload={createEventMutation.mutate}
          mutationError={createEventMutation.error}
          isPending={createEventMutation.isPending}
          isPaused={createEventMutation.isPaused}
          onUploadBanner={onUploadBanner}
          isUploadingBanner={isUploadingBanner}
        />
      </main>
    </div>
  );
}
