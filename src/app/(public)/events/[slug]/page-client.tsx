"use client";

import { useEffect } from "react";
import { History, Scroll } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { Else, If, Then } from "react-if";

import RichTextContent from "@/app/_components/rich-text-content";
import dayjs from "@/libs/dayjs";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";

import { useGetPublicEventByIdentifier } from "@/app/(public)/events/[slug]/_hooks/use-get-public-event-by-identifier";
import PublicEventDetailHero from "@/app/(public)/events/[slug]/_components/public-event-detail-hero";
import PublicEventDetailSection from "@/app/(public)/events/[slug]/_components/public-event-detail-section";
import PublicEventDetailSummary from "@/app/(public)/events/[slug]/_components/public-event-detail-summary";
import PublicEventDetailSkeleton from "@/app/(public)/events/[slug]/_components/public-event-detail-skeleton";
import PublicEventParty from "@/app/(public)/events/[slug]/_components/public-event-party";
import PublicEventComments from "@/app/(public)/events/[slug]/_components/public-event-comments";
import PublicEventErrorState from "@/app/(public)/events/_components/public-event-error-state";
import { EVENT_DETAIL_MESSAGES } from "@/app/(public)/events/[slug]/_messages";
import { PUBLIC_EVENT_DETAIL_DATE_FORMAT } from "@/app/(public)/events/[slug]/_constants/public-event-detail-date-format";

export default function PublicEventDetailPageClient() {
  // Slug URL; the API also accepts the id, so old /events/<id> links still work
  const slugParam = useParams().slug;
  const eventIdentifier = typeof slugParam === "string" ? slugParam : "";
  const { auth } = useAuthContext();
  const { t } = useT(EVENT_DETAIL_MESSAGES);
  const { locale } = useLocale();
  // Keyed by viewer so action_list refetches after login/logout
  const eventQuery = useGetPublicEventByIdentifier(eventIdentifier, {
    userId: auth?.id,
  });
  const event = eventQuery.data?.data?.data;
  const isNotFound =
    eventQuery.isError && eventQuery.error instanceof MainAPINotFoundError;

  useEffect(() => {
    // 404 for unknown ids and for events that are not published/completed
    if (isNotFound) {
      notFound();
    }
  }, [isNotFound]);

  return (
    <div className="w-full min-w-0">
      <If condition={eventQuery.isLoading}>
        <Then>
          <PublicEventDetailSkeleton />
        </Then>
        <Else>
          <If condition={!!event}>
            <Then>
              {event && (
                <article className="flex flex-col pb-36 lg:pb-16">
                  <PublicEventDetailHero event={event} />

                  <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 pt-2 sm:gap-8 sm:px-6 lg:grid-cols-3 lg:px-10">
                    {/* Summary first on mobile, sticky right column on desktop */}
                    <PublicEventDetailSummary
                      event={event}
                      className="lg:sticky lg:top-24 lg:order-last lg:self-start"
                    />

                    <div className="flex flex-col gap-6 sm:gap-8 lg:col-span-2">
                      <PublicEventDetailSection icon={Scroll} title={t("tale.title")}>
                        {event.description ? (
                          <RichTextContent
                            value={event.description}
                            className="text-base leading-relaxed"
                          />
                        ) : (
                          <p className="italic text-muted-foreground">
                            {t("tale.empty")}
                          </p>
                        )}
                      </PublicEventDetailSection>

                      <PublicEventParty
                        eventId={event.id}
                        maxMembers={event.max_members}
                      />

                      <PublicEventComments event={event} />

                      <PublicEventDetailSection
                        icon={History}
                        title={t("chronicle.title")}
                      >
                        <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                          <div className="flex flex-col gap-1 rounded-sm border border-dashed bg-muted/40 p-4">
                            <dt className="text-xs text-muted-foreground uppercase">
                              {t("chronicle.posted")}
                            </dt>
                            <dd className="font-medium">
                              {dayjs(event.created_at)
                                .locale(locale)
                                .format(PUBLIC_EVENT_DETAIL_DATE_FORMAT)}
                            </dd>
                          </div>
                          <div className="flex flex-col gap-1 rounded-sm border border-dashed bg-muted/40 p-4">
                            <dt className="text-xs text-muted-foreground uppercase">
                              {t("chronicle.lastUpdated")}
                            </dt>
                            <dd className="font-medium">
                              {dayjs(event.updated_at)
                                .locale(locale)
                                .format(PUBLIC_EVENT_DETAIL_DATE_FORMAT)}
                            </dd>
                          </div>
                        </dl>
                      </PublicEventDetailSection>

                    </div>
                  </div>
                </article>
              )}
            </Then>
            <Else>
              <If condition={eventQuery.isError && !isNotFound}>
                <Then>
                  <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
                    <PublicEventErrorState
                      title={t("error.title")}
                      description={t("error.description")}
                      onRetry={() => eventQuery.refetch()}
                    />
                  </div>
                </Then>
              </If>
            </Else>
          </If>
        </Else>
      </If>
    </div>
  );
}
