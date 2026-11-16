"use client";

import { useCallback, useMemo, useState } from "react";
import { createParser, parseAsInteger, parseAsString } from "nuqs";

import { useCamelCaseQueryStates } from "@/libs/nuqs/use-camel-case-query-states";
import type { TPublicEventPaginationPayload } from "@/api/main/modules/events/types/public-event-pagination-payload";
import { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";

import PublicEventListHero from "@/app/(public)/events/_components/public-event-list-hero";
import PublicEventFilters from "@/app/(public)/events/_components/public-event-filters";
import PublicEventCardList from "@/app/(public)/events/_components/public-event-card-list";
import { useGetPublicEventPagination } from "@/app/(public)/events/_hooks/use-get-public-event-pagination";
import { PUBLIC_EVENT_PAGE_SIZE } from "@/app/(public)/events/_constants/public-event-page-size";
import { PUBLIC_EVENT_STATUS_OPTIONS } from "@/app/(public)/events/_constants/public-event-status-options";
import type {
  TPublicEventCardListFilters,
  TPublicEventStatus,
} from "@/app/(public)/events/_types/public-event-card-list-props";

function parseAsNumericValues<T extends number>(values: readonly T[]) {
  return createParser({
    parse: (value) => {
      const n = Number(value);
      return values.includes(n as T) ? (n as T) : null;
    },
    serialize: (value) => String(value),
  });
}

function numericEnumValues<T extends Record<string, number | string>>(
  enumObj: T,
) {
  return Object.values(enumObj).filter(
    (v): v is T[keyof T] & number => typeof v === "number",
  );
}

export default function EventsPageClient() {
  const [queryStates, setQueryStates] = useCamelCaseQueryStates({
    page: parseAsInteger.withDefault(1),
    search: parseAsString.withDefault(""),
    status: parseAsNumericValues<TPublicEventStatus>(
      PUBLIC_EVENT_STATUS_OPTIONS,
    ),
    locationType: parseAsNumericValues(
      numericEnumValues(EventLocationTypeEnum),
    ),
  });

  const queryStatesIntoPayload: TPublicEventPaginationPayload = useMemo(
    () => ({
      page: queryStates.page,
      per_page: PUBLIC_EVENT_PAGE_SIZE,
      search: queryStates.search,
      // nuqs parsers return null when unset, but API expects undefined — coalesce
      status: queryStates.status ?? undefined,
      location_type: queryStates.locationType ?? undefined,
    }),
    [queryStates],
  );

  const {
    data: responseData,
    isLoading,
    isError,
    refetch,
  } = useGetPublicEventPagination(queryStatesIntoPayload);
  // Remounts the uncontrolled search input and the filter popover after a reset
  const [filtersKey, setFiltersKey] = useState(0);

  const events = useMemo(
    () => responseData?.data?.data?.items ?? [],
    [responseData],
  );

  const onSearchChange = useCallback(
    (value: string) => {
      setQueryStates({ search: value, page: 1 });
    },
    [setQueryStates],
  );

  const onFilterApply = useCallback(
    (filters: TPublicEventCardListFilters) => {
      setQueryStates({ ...filters, page: 1 });
    },
    [setQueryStates],
  );

  const onReset = useCallback(() => {
    setQueryStates({
      search: "",
      page: 1,
      status: null,
      locationType: null,
    });
    setFiltersKey((key) => key + 1);
  }, [setQueryStates]);

  const handlePageChange = useCallback(
    (page: number) => {
      setQueryStates({ page });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setQueryStates],
  );

  const totalEvents = responseData?.data?.data?.meta?.total_all_data;

  return (
    <div className="w-full flex justify-center min-w-0">
      <main className="w-full max-w-7xl flex flex-col gap-6 px-4 pt-2 pb-10 sm:gap-8 sm:px-6 sm:pb-16 lg:px-10">
        <PublicEventListHero totalEvents={totalEvents ?? null} />

        <PublicEventFilters
          key={filtersKey}
          queryTable={queryStates}
          onSearchChange={onSearchChange}
          onFilterApply={onFilterApply}
        />

        <PublicEventCardList
          data={events}
          isLoading={isLoading}
          isError={isError}
          onRetry={() => refetch()}
          onReset={onReset}
          pageCount={responseData?.data?.data?.meta?.total_page || 1}
          rowCount={totalEvents || 0}
          queryTable={queryStates}
          onActionHandler={{
            onPageChange: handlePageChange,
            onSearchChange,
            onFilterApply,
          }}
        />
      </main>
    </div>
  );
}
