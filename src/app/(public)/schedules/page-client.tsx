"use client";

import { useCallback, useMemo, useState } from "react";
import { parseAsStringLiteral } from "nuqs";

import { useCamelCaseQueryStates } from "@/libs/nuqs/use-camel-case-query-states";
import { ScheduleItemTypeEnum } from "@/api/main/modules/schedules/enums/schedule-item-type";
import type { TPublicScheduleListPayload } from "@/api/main/modules/schedules/types/public-schedule-list-payload";
import PublicScheduleHero from "@/app/(public)/schedules/_components/public-schedule-hero";
import PublicScheduleFilters from "@/app/(public)/schedules/_components/public-schedule-filters";
import PublicScheduleCalendar from "@/app/(public)/schedules/_components/public-schedule-calendar";
import { useGetPublicSchedules } from "@/app/(public)/schedules/_hooks/use-get-public-schedules";
import { mapPublicScheduleToCalendarEvent } from "@/app/(public)/schedules/_utils/map-public-schedule-to-calendar-event";

const TYPE_OPTIONS = [
  ScheduleItemTypeEnum.STORY,
  ScheduleItemTypeEnum.EVENT,
] as const;

export default function SchedulesPageClient() {
  const [queryStates, setQueryStates] = useCamelCaseQueryStates({
    type: parseAsStringLiteral(TYPE_OPTIONS),
  });
  const [range, setRange] = useState<{ start: string; end: string } | null>(
    null,
  );

  const payload: TPublicScheduleListPayload | null = useMemo(() => {
    if (!range) {
      return null;
    }
    return {
      start: range.start,
      end: range.end,
      type: queryStates.type ? [queryStates.type] : undefined,
    };
  }, [range, queryStates.type]);

  const {
    data: responseData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetPublicSchedules(payload);

  const items = useMemo(
    () => responseData?.data?.data?.items ?? [],
    [responseData],
  );
  const events = useMemo(
    () => items.map(mapPublicScheduleToCalendarEvent),
    [items],
  );

  const onTypeChange = useCallback(
    (type: ScheduleItemTypeEnum | null) => {
      setQueryStates({ type });
    },
    [setQueryStates],
  );

  const onDatesSet = useCallback((start: string, end: string) => {
    setRange((current) => {
      if (current?.start === start && current.end === end) {
        return current;
      }
      return { start, end };
    });
  }, []);

  const totalItems =
    payload === null ? null : (responseData?.data?.data?.total ?? null);

  return (
    <div className="w-full flex justify-center min-w-0">
      <main className="w-full max-w-7xl flex flex-col gap-6 px-4 pt-2 pb-10 sm:gap-8 sm:px-6 sm:pb-16 lg:px-10">
        <PublicScheduleHero totalItems={totalItems} />
        <PublicScheduleFilters
          type={queryStates.type}
          onTypeChange={onTypeChange}
        />
        <PublicScheduleCalendar
          events={events}
          isLoading={isLoading || isFetching}
          isError={isError}
          onDatesSet={onDatesSet}
          onRetry={() => {
            void refetch();
          }}
        />
      </main>
    </div>
  );
}
