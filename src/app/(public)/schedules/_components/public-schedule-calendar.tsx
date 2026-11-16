"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Else, If, Then } from "react-if";
import type { DatesSetInfo, EventClickInfo } from "@fullcalendar/react";
import idLocale from "@fullcalendar/react/locales/id";

import { ScheduleItemTypeEnum } from "@/api/main/modules/schedules/enums/schedule-item-type";

import { EventCalendar } from "@/app/_components/event-calendar";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";
import { SCHEDULES_MESSAGES } from "@/app/(public)/schedules/_messages";
import {
  formatPublicScheduleMoreLink,
  PUBLIC_SCHEDULE_INITIAL_VIEW,
  PUBLIC_SCHEDULE_MOBILE_MEDIA,
  PUBLIC_SCHEDULE_MOBILE_MONTH_MAX_EVENTS,
  PUBLIC_SCHEDULE_MOBILE_POPOVER_CLASS,
  PUBLIC_SCHEDULE_MOBILE_TITLE_FORMAT,
  PUBLIC_SCHEDULE_TIME_FORMAT,
  PUBLIC_SCHEDULE_VIEWS,
} from "@/app/(public)/schedules/_constants/public-schedule-views";
import PublicScheduleErrorState from "@/app/(public)/schedules/_components/public-schedule-error-state";
import { handlePublicScheduleMoreLinkClick } from "@/app/(public)/schedules/_utils/keep-public-schedule-popover-in-viewport";
import type { TPublicScheduleCalendarProps } from "@/app/(public)/schedules/_types/public-schedule-calendar-props";

function subscribeToMobileViewport(onChange: () => void) {
  const media = window.matchMedia(PUBLIC_SCHEDULE_MOBILE_MEDIA);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getMobileViewportSnapshot() {
  return window.matchMedia(PUBLIC_SCHEDULE_MOBILE_MEDIA).matches;
}

function subscribeToClientMount() {
  return () => {};
}

function getClientMountSnapshot() {
  return true;
}

function getServerMountSnapshot() {
  return false;
}

export default function PublicScheduleCalendar({
  events,
  isLoading,
  isError,
  onDatesSet,
  onRetry,
}: TPublicScheduleCalendarProps) {
  const { t } = useT(SCHEDULES_MESSAGES);
  const { locale } = useLocale();
  const router = useRouter();
  const hasMounted = useSyncExternalStore(
    subscribeToClientMount,
    getClientMountSnapshot,
    getServerMountSnapshot,
  );
  const isMobile = useSyncExternalStore(
    subscribeToMobileViewport,
    getMobileViewportSnapshot,
    getServerMountSnapshot,
  );

  const handleDatesSet = useCallback(
    (info: DatesSetInfo) => {
      onDatesSet(info.start.toISOString(), info.end.toISOString());
    },
    [onDatesSet],
  );

  const handleEventClick = useCallback(
    (info: EventClickInfo) => {
      const jsEvent = info.jsEvent;
      if (jsEvent.metaKey || jsEvent.ctrlKey || jsEvent.shiftKey) {
        return;
      }
      jsEvent.preventDefault();
      const type = info.event.extendedProps.type;
      const slug = info.event.extendedProps.slug;
      if (typeof type !== "string" || typeof slug !== "string" || !slug) {
        return;
      }
      const href =
        type === ScheduleItemTypeEnum.STORY
          ? `/stories/${encodeURIComponent(slug)}`
          : `/events/${encodeURIComponent(slug)}`;
      router.push(href);
    },
    [router],
  );

  const locales = useMemo(() => [idLocale], []);
  const views = useMemo(
    () =>
      isMobile
        ? {
            dayGridMonth: {
              dayMaxEvents: PUBLIC_SCHEDULE_MOBILE_MONTH_MAX_EVENTS,
              moreLinkClick: handlePublicScheduleMoreLinkClick,
              moreLinkText: formatPublicScheduleMoreLink,
            },
          }
        : undefined,
    [isMobile],
  );

  return (
    <div className="relative min-w-0 [--chart-1:var(--accent)] overflow-hidden rounded-md border bg-background">
      <If condition={!hasMounted}>
        <Then>
          <div className="flex flex-col gap-3 p-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-80 w-full sm:h-[32rem]" />
            <p className="sr-only">{t("calendar.loading")}</p>
          </div>
        </Then>
        <Else>
          <EventCalendar
            key={locale}
            availableViews={PUBLIC_SCHEDULE_VIEWS}
            initialView={PUBLIC_SCHEDULE_INITIAL_VIEW}
            events={events}
            datesSet={handleDatesSet}
            eventClick={handleEventClick}
            editable={false}
            selectable={false}
            locale={locale}
            locales={locales}
            height="auto"
            eventTimeFormat={PUBLIC_SCHEDULE_TIME_FORMAT}
            titleFormat={
              isMobile ? PUBLIC_SCHEDULE_MOBILE_TITLE_FORMAT : undefined
            }
            {...(isMobile
              ? {
                  views,
                  popoverClass: PUBLIC_SCHEDULE_MOBILE_POPOVER_CLASS,
                }
              : {})}
            noEventsContent={t("calendar.empty")}
          />
        </Else>
      </If>
      <If condition={isError}>
        <Then>
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 p-4">
            <PublicScheduleErrorState
              title={t("error.title")}
              description={t("error.description")}
              onRetry={onRetry}
            />
          </div>
        </Then>
      </If>
      <If condition={isLoading && !isError && hasMounted}>
        <Then>
          <div className="pointer-events-none absolute inset-x-0 top-16 bottom-0 z-10 flex items-center justify-center bg-background/50">
            <p className="rounded-md border bg-background px-3 py-1.5 text-sm text-muted-foreground">
              {t("calendar.loading")}
            </p>
          </div>
        </Then>
      </If>
    </div>
  );
}
