"use client";

import { usePrefetchInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { Case, Default, Switch } from "react-if";

import { Button } from "@/app/_components/ui/button";
import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import { useT } from "@/app/_hooks/use-t";

import BoardEventErrorState from "@/app/(authenticated)/dashboard/(player-board)/events/_components/board-event-error-state";
import BoardEventDetailHero from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_components/board-event-detail-hero";
import BoardEventDetailQuestCard from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_components/board-event-detail-quest-card";
import BoardEventDetailAdventureCard from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_components/board-event-detail-adventure-card";
import BoardEventDetailChronicleCard from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_components/board-event-detail-chronicle-card";
import BoardEventDetailMembersCard from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_components/board-event-detail-members-card";
import BoardEventDetailSkeleton from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_components/board-event-detail-skeleton";
import { useGetBoardEventById } from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_hooks/use-get-board-event-by-id";
import { getBoardEventMemberPaginationOptions } from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_hooks/use-get-board-event-member-pagination";
import { BOARD_EVENT_MEMBER_PREVIEW_COUNT } from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_constants/board-event-detail";
import { BOARD_EVENT_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_messages";

export default function BoardEventDetailPageClient() {
  const { t } = useT(BOARD_EVENT_DETAIL_MESSAGES);
  const { id } = useParams();
  const eventId = typeof id === "string" ? id : "";

  const eventQuery = useGetBoardEventById(eventId);
  // Start the members card's query alongside the event instead of after it,
  // without subscribing this page to it
  usePrefetchInfiniteQuery(
    getBoardEventMemberPaginationOptions(
      eventId,
      BOARD_EVENT_MEMBER_PREVIEW_COUNT,
    ),
  );
  const event = eventQuery.data?.data?.data;
  const isNotFound =
    eventQuery.isError && eventQuery.error instanceof MainAPINotFoundError;

  useEffect(() => {
    // Unknown id, or an event the viewer is not a member of (API returns 404)
    if (isNotFound) notFound();
  }, [isNotFound]);

  return (
    <div className="w-full flex justify-center min-w-0">
      <main className="w-full max-w-7xl flex flex-col px-4 pb-10 sm:px-6 lg:px-10">
        <AppBreadcrumb
          items={[
            { name: t("breadcrumb"), link: "/dashboard/events" },
            { name: event?.title ?? t("breadcrumbDetail") },
          ]}
        />

        <div className="flex items-center mt-4 mb-6 gap-x-2">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={t("backAria")}
            render={<Link href="/dashboard/events" />}
            nativeButton={false}
          >
            <ArrowLeft />
          </Button>
          <h1 className="font-heading text-2xl">{t("title")}</h1>
        </div>

        <Switch>
          <Case condition={eventQuery.isPending}>
            <BoardEventDetailSkeleton />
          </Case>
          <Case condition={!event && !isNotFound}>
            <BoardEventErrorState
              title={t("error.title")}
              description={t("error.description")}
              onRetry={() => eventQuery.refetch()}
            />
          </Case>
          <Default>
            {event && (
              <div className="flex flex-col gap-6">
                <BoardEventDetailHero event={event} />
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <BoardEventDetailQuestCard
                    event={event}
                    className="max-lg:hidden lg:col-span-2 lg:self-start"
                  />
                  <div className="flex flex-col gap-6">
                    <BoardEventDetailAdventureCard event={event} />
                    <BoardEventDetailChronicleCard event={event} />
                    <BoardEventDetailMembersCard eventId={eventId} />
                  </div>
                  <BoardEventDetailQuestCard
                    event={event}
                    className="lg:hidden"
                  />
                </div>
              </div>
            )}
          </Default>
        </Switch>
      </main>
    </div>
  );
}
