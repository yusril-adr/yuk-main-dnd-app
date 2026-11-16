"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter, notFound } from "next/navigation";
import { If, Then, Else } from "react-if";
import {
  usePrefetchInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import CONFIG from "@/common/constants/config";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import type { TEventDetailResponse } from "@/api/main/modules/master/events/[id]/types/event-detail-response";
import { useT } from "@/app/_hooks/use-t";

import { useDeleteEventById } from "@/app/(authenticated)/dashboard/master/events/_hooks/use-delete-event-by-id";
import { useGetEventById } from "@/app/(authenticated)/dashboard/master/events/_hooks/use-get-event-by-id";
import { getEventMemberPaginationOptions } from "@/app/(authenticated)/dashboard/master/events/_hooks/use-get-event-member-pagination";
import { EVENT_MEMBER_PREVIEW_COUNT } from "@/app/(authenticated)/dashboard/master/events/_constants/event-member-preview";
import { useArchiveEventById } from "@/app/(authenticated)/dashboard/master/events/_hooks/use-archive-event-by-id";
import { useUnarchiveEventById } from "@/app/(authenticated)/dashboard/master/events/_hooks/use-unarchive-event-by-id";
import { usePublishEventById } from "@/app/(authenticated)/dashboard/master/events/_hooks/use-publish-event-by-id";
import { useCancelEventById } from "@/app/(authenticated)/dashboard/master/events/_hooks/use-cancel-event-by-id";
import EventDetailHero from "@/app/(authenticated)/dashboard/master/events/[id]/_components/event-detail-hero";
import EventDetailDescriptionCard from "@/app/(authenticated)/dashboard/master/events/[id]/_components/event-detail-description-card";
import EventDetailInfoCard from "@/app/(authenticated)/dashboard/master/events/[id]/_components/event-detail-info-card";
import EventDetailAboutCard from "@/app/(authenticated)/dashboard/master/events/[id]/_components/event-detail-about-card";
import EventDetailMembersCard from "@/app/(authenticated)/dashboard/master/events/[id]/_components/event-detail-members-card";
import EventDetailSkeleton from "@/app/(authenticated)/dashboard/master/events/[id]/_components/event-detail-skeleton";
import EventDetailActions from "@/app/(authenticated)/dashboard/master/events/[id]/_components/event-detail-actions";
import EventCompleteDialog from "@/app/(authenticated)/dashboard/master/events/_components/event-complete-dialog";
import { MASTER_EVENT_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/[id]/_messages";

export default function EventDetailPageClient() {
  const { t } = useT(MASTER_EVENT_DETAIL_MESSAGES);
  const params = useParams();
  const eventId = typeof params.id === "string" ? params.id : "";
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);
  const [isUnarchiveDialogOpen, setIsUnarchiveDialogOpen] = useState(false);
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const eventQuery = useGetEventById(eventId);
  // Start the members card's query alongside the event instead of after it,
  // without subscribing this page to it
  usePrefetchInfiniteQuery(
    getEventMemberPaginationOptions(eventId, EVENT_MEMBER_PREVIEW_COUNT),
  );
  const event = eventQuery.data?.data?.data;
  const canEdit = !!event && event.action_list.is_can_update;
  const canPublish = !!event && event.action_list.is_can_publish;
  const canComplete = !!event && event.action_list.is_can_complete;
  const canArchive = !!event && event.action_list.is_can_archive;
  const canUnarchive = !!event && event.action_list.is_can_unarchive;
  const canCancel = !!event && event.action_list.is_can_cancel;
  const canDelete = !!event && event.action_list.is_can_delete;
  const canAddMembers = !!event && event.action_list.is_can_add_members;
  const canRemoveMembers = !!event && event.action_list.is_can_remove_members;
  const canCreateGuestUser =
    !!event && event.action_list.is_can_create_guest_user;
  const hasEventActions =
    canEdit ||
    canPublish ||
    canComplete ||
    canArchive ||
    canUnarchive ||
    canCancel ||
    canDelete;
  const deleteEventMutation = useDeleteEventById({
    onError: (mutationError) => {
      if (mutationError instanceof MainAPINotFoundError) {
        router.push("/dashboard/master/events");
      }
    },
    onSuccess: () => {
      router.push("/dashboard/master/events");
    },
  });

  const archiveEventMutation = useArchiveEventById({
    onError: (mutationError) => {
      if (mutationError instanceof MainAPINotFoundError) {
        router.push("/dashboard/master/events");
      }
    },
    onSuccess: () => {
      // Refreshes the list and this detail query (its key starts with EVENT.ALL())
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.EVENT.ALL()],
      });
    },
  });

  const unarchiveEventMutation = useUnarchiveEventById({
    onError: (mutationError) => {
      if (mutationError instanceof MainAPINotFoundError) {
        router.push("/dashboard/master/events");
      }
    },
    onSuccess: () => {
      // Refreshes the list and this detail query (its key starts with EVENT.ALL())
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.EVENT.ALL()],
      });
    },
  });

  const publishEventMutation = usePublishEventById({
    onError: (mutationError) => {
      if (mutationError instanceof MainAPINotFoundError) {
        router.push("/dashboard/master/events");
      }
    },
    onSuccess: () => {
      // Refreshes the list and this detail query (its key starts with EVENT.ALL())
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.EVENT.ALL()],
      });
    },
  });

  const cancelEventMutation = useCancelEventById({
    onError: (mutationError) => {
      if (mutationError instanceof MainAPINotFoundError) {
        router.push("/dashboard/master/events");
      }
    },
    onSuccess: () => {
      // Refreshes the list and this detail query (its key starts with EVENT.ALL())
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.EVENT.ALL()],
      });
    },
  });

  useEffect(() => {
    if (
      eventQuery.isError &&
      eventQuery.error instanceof MainAPINotFoundError
    ) {
      notFound();
    }
  }, [eventQuery.error, eventQuery.isError, router]);

  const breadcrumbItems = useMemo(
    () => [
      { name: t("breadcrumb"), link: "/dashboard/master/events" },
      { name: event?.title ?? t("breadcrumbDetail") },
    ],
    [event?.title, t],
  );

  const onPublishHandler = () => {
    publishEventMutation.mutate(eventId);
    setIsPublishDialogOpen(false);
  };

  const onArchiveHandler = () => {
    archiveEventMutation.mutate(eventId);
    setIsArchiveDialogOpen(false);
  };

  const onUnarchiveHandler = () => {
    unarchiveEventMutation.mutate(eventId);
    setIsUnarchiveDialogOpen(false);
  };

  const onCancelHandler = () => {
    cancelEventMutation.mutate(eventId);
    setIsCancelDialogOpen(false);
  };

  const onDeleteHandler = () => {
    deleteEventMutation.mutate(eventId);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="w-full flex justify-center">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <AppBreadcrumb items={breadcrumbItems} />

        <div className="flex items-center mt-4 mb-6 gap-x-2">
          <Link href="/dashboard/master/events">
            <ArrowLeft />
          </Link>
          <h1 className="font-heading text-2xl">{t("title")}</h1>
          <If condition={hasEventActions}>
            <Then>
              <EventDetailActions
                eventId={eventId}
                canEdit={canEdit}
                canPublish={canPublish}
                canComplete={canComplete}
                canArchive={canArchive}
                canUnarchive={canUnarchive}
                canCancel={canCancel}
                canDelete={canDelete}
                isPublishPending={publishEventMutation.isPending}
                isArchivePending={archiveEventMutation.isPending}
                isUnarchivePending={unarchiveEventMutation.isPending}
                isCancelPending={cancelEventMutation.isPending}
                onPublishClick={() => setIsPublishDialogOpen(true)}
                onCompleteClick={() => setIsCompleteDialogOpen(true)}
                onArchiveClick={() => setIsArchiveDialogOpen(true)}
                onUnarchiveClick={() => setIsUnarchiveDialogOpen(true)}
                onCancelClick={() => setIsCancelDialogOpen(true)}
                onDeleteClick={() => setIsDeleteDialogOpen(true)}
              />
            </Then>
          </If>
        </div>

        <If condition={eventQuery.isLoading}>
          <Then>
            <EventDetailSkeleton />
          </Then>
          <Else>
            {event ? (
              <EventDetailBody
                event={event}
                eventId={eventId}
                canAddMembers={canAddMembers}
                canRemoveMembers={canRemoveMembers}
                canCreateGuestUser={canCreateGuestUser}
              />
            ) : null}
          </Else>
        </If>

        <AlertDialog
          open={isPublishDialogOpen}
          onOpenChange={setIsPublishDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("dialogs.publishTitle")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("dialogs.publishDescription")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("dialogs.cancel")}</AlertDialogCancel>
              <AlertDialogAction
                disabled={publishEventMutation.isPending}
                onClick={onPublishHandler}
              >
                {t("dialogs.publishConfirm")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
          open={isArchiveDialogOpen}
          onOpenChange={setIsArchiveDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("dialogs.archiveTitle")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("dialogs.archiveDescription")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("dialogs.cancel")}</AlertDialogCancel>
              <AlertDialogAction
                disabled={archiveEventMutation.isPending}
                onClick={onArchiveHandler}
              >
                {t("dialogs.archiveConfirm")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
          open={isUnarchiveDialogOpen}
          onOpenChange={setIsUnarchiveDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("dialogs.unarchiveTitle")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("dialogs.unarchiveDescription")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("dialogs.cancel")}</AlertDialogCancel>
              <AlertDialogAction
                disabled={unarchiveEventMutation.isPending}
                onClick={onUnarchiveHandler}
              >
                {t("dialogs.unarchiveConfirm")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
          open={isCancelDialogOpen}
          onOpenChange={setIsCancelDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("dialogs.cancelTitle")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("dialogs.cancelDescription")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("dialogs.cancel")}</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={cancelEventMutation.isPending}
                onClick={onCancelHandler}
              >
                {t("dialogs.cancelConfirm")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("dialogs.deleteTitle")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("dialogs.deleteDescription")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("dialogs.cancel")}</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={deleteEventMutation.isPending}
                onClick={onDeleteHandler}
              >
                {t("dialogs.deleteConfirm")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <EventCompleteDialog
          eventId={eventId}
          open={isCompleteDialogOpen}
          onOpenChange={setIsCompleteDialogOpen}
        />
      </main>
    </div>
  );
}

function EventDetailBody({
  event,
  eventId,
  canAddMembers,
  canRemoveMembers,
  canCreateGuestUser,
}: {
  event: TEventDetailResponse;
  eventId: string;
  canAddMembers: boolean;
  canRemoveMembers: boolean;
  canCreateGuestUser: boolean;
}) {
  return (
    <div className="flex flex-col gap-6">
      <EventDetailHero event={event} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <EventDetailDescriptionCard
          event={event}
          className="max-lg:hidden lg:col-span-2 lg:self-start"
        />
        <div className="flex flex-col gap-6">
          <EventDetailInfoCard event={event} />
          <EventDetailAboutCard event={event} />
          <EventDetailMembersCard
            eventId={eventId}
            canAddMembers={canAddMembers}
            canRemoveMembers={canRemoveMembers}
            canCreateGuestUser={canCreateGuestUser}
          />
        </div>
        <EventDetailDescriptionCard event={event} className="lg:hidden" />
      </div>
    </div>
  );
}
