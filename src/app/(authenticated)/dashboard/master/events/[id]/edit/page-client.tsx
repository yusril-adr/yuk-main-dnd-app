"use client";

import { useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import EventEditForm from "./_components/event-edit-form";
import { useGetEventById } from "@/app/(authenticated)/dashboard/master/events/_hooks/use-get-event-by-id";
import { useUpdateEventById } from "@/app/(authenticated)/dashboard/master/events/_hooks/use-update-event-by-id";
import { useBannerUploadFile } from "@/app/(authenticated)/dashboard/master/events/_hooks/use-banner-upload-file";
import type { TEventBannerUploadHandler } from "@/app/(authenticated)/dashboard/master/events/_types/event-banner-upload-handler";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import CONFIG from "@/common/constants/config";
import { useT } from "@/app/_hooks/use-t";
import { MASTER_EVENTS_EDIT_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/[id]/edit/_messages";

export default function EventEditPageClient() {
  const { t } = useT(MASTER_EVENTS_EDIT_MESSAGES);
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const eventId = id as string;
  const eventQuery = useGetEventById(eventId);
  const updateEventMutation = useUpdateEventById({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.EVENT.ALL()],
      });
      router.push(`/dashboard/master/events/${eventId}`);
    },
    onError: (error) => {
      if (error instanceof MainAPINotFoundError) {
        router.push("/dashboard/master/events");
      }
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
  const event = eventQuery.data?.data?.data;
  const isCompletedEditBlocked =
    !!event &&
    !event.action_list.is_can_update &&
    event.status === EventStatusEnum.COMPLETED;
  const isEditForbidden = !!event && !event.action_list.is_can_update;

  useEffect(() => {
    if (
      eventQuery.isError &&
      eventQuery.error instanceof MainAPINotFoundError
    ) {
      notFound();
    }
  }, [eventQuery.error, eventQuery.isError, router]);

  useEffect(() => {
    if (!isEditForbidden) {
      return;
    }

    toast.error(
      isCompletedEditBlocked
        ? t("toast.completedBlocked")
        : t("toast.editForbidden"),
    );
    router.replace(`/dashboard/master/events/${eventId}`);
  }, [isCompletedEditBlocked, isEditForbidden, router, eventId, t]);

  return (
    <div className="w-full flex justify-center">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <AppBreadcrumb
          items={[
            {
              name: t("breadcrumb.events"),
              link: "/dashboard/master/events",
            },
            ...(event
              ? [
                  {
                    name: event.title,
                    link: `/dashboard/master/events/${eventId}`,
                  },
                ]
              : []),
            { name: t("breadcrumb.edit") },
          ]}
        />

        <div className="flex items-center mt-4 mb-6 gap-x-2">
          <Link href={`/dashboard/master/events/${eventId}`}>
            <ArrowLeft />
          </Link>
          <h1 className="font-heading text-2xl">{t("title.edit")}</h1>
        </div>

        <EventEditForm
          event={event}
          isLoading={eventQuery.isLoading || isEditForbidden}
          onSubmitPayload={(payload) =>
            updateEventMutation.mutate({ id: eventId, payload })
          }
          mutationError={updateEventMutation.error}
          isPending={updateEventMutation.isPending}
          isPaused={updateEventMutation.isPaused}
          onUploadBanner={onUploadBanner}
          isUploadingBanner={isUploadingBanner}
        />
      </main>
    </div>
  );
}
