"use client";

import { useCallback, useMemo, useState } from "react";
import { createParser, parseAsInteger, parseAsString } from "nuqs";

import type { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import { useCamelCaseQueryStates } from "@/libs/nuqs/use-camel-case-query-states";
import type { TBoardEventPaginationPayload } from "@/api/main/modules/board/events/types/board-event-pagination-payload";
import { useT } from "@/app/_hooks/use-t";

import BoardEventFilters from "@/app/(authenticated)/dashboard/(player-board)/events/_components/board-event-filters";
import BoardEventCardList from "@/app/(authenticated)/dashboard/(player-board)/events/_components/board-event-card-list";
import { useGetBoardEventPagination } from "@/app/(authenticated)/dashboard/(player-board)/events/_hooks/use-get-board-event-pagination";
import {
  BOARD_EVENT_MEMBER_STATUS_OPTIONS,
  BOARD_EVENT_PAGE_SIZE,
  BOARD_EVENT_STATUS_OPTIONS,
} from "@/app/(authenticated)/dashboard/(player-board)/events/_constants/board-event";
import { BOARD_EVENTS_MESSAGES } from "@/app/(authenticated)/dashboard/(player-board)/events/_messages";
import type { TBoardEventFilterValues } from "@/app/(authenticated)/dashboard/(player-board)/events/_types/board-event-components-props";

function parseAsNumericValues<T extends number>(values: readonly T[]) {
  return createParser({
    parse: (value) => {
      const n = Number(value);
      return values.includes(n as T) ? (n as T) : null;
    },
    serialize: (value) => String(value),
  });
}

export default function EventsPageClient() {
  const { t } = useT(BOARD_EVENTS_MESSAGES);
  const [queryStates, setQueryStates] = useCamelCaseQueryStates({
    page: parseAsInteger.withDefault(1),
    search: parseAsString.withDefault(""),
    status: parseAsNumericValues<EventStatusEnum>(BOARD_EVENT_STATUS_OPTIONS),
    memberStatus: parseAsNumericValues(BOARD_EVENT_MEMBER_STATUS_OPTIONS),
  });
  // Remounts the uncontrolled search input after a reset
  const [filtersKey, setFiltersKey] = useState(0);

  const payload: TBoardEventPaginationPayload = useMemo(
    () => ({
      page: queryStates.page,
      per_page: BOARD_EVENT_PAGE_SIZE,
      search: queryStates.search || undefined,
      // nuqs gives null when unset; the API wants the param omitted
      status: queryStates.status ?? undefined,
      member_status: queryStates.memberStatus ?? undefined,
    }),
    [queryStates],
  );

  const { data, isPending, isError, refetch } =
    useGetBoardEventPagination(payload);
  const events = useMemo(() => data?.data?.data?.items ?? [], [data]);
  const meta = data?.data?.data?.meta;

  const onSearchChange = useCallback(
    (search: string) => setQueryStates({ search, page: 1 }),
    [setQueryStates],
  );

  const onFilterChange = useCallback(
    (filters: TBoardEventFilterValues) =>
      setQueryStates({ ...filters, page: 1 }),
    [setQueryStates],
  );

  const onReset = useCallback(() => {
    setQueryStates({ search: "", page: 1, status: null, memberStatus: null });
    setFiltersKey((key) => key + 1);
  }, [setQueryStates]);

  const onPageChange = useCallback(
    (page: number) => {
      setQueryStates({ page });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setQueryStates],
  );

  const isFiltered =
    !!queryStates.search ||
    queryStates.status != null ||
    queryStates.memberStatus != null;

  return (
    <div className="w-full flex justify-center min-w-0">
      <main className="w-full max-w-7xl flex flex-col px-4 pb-10 sm:px-6 lg:px-10">
        <AppBreadcrumb items={[{ name: t("breadcrumb") }]} />

        <div className="mt-4 mb-6 flex flex-col gap-1">
          <h1 className="font-heading text-2xl">{t("title")}</h1>
          <p className="text-sm text-muted-foreground">{t("description")}</p>
        </div>

        <div className="flex flex-col gap-4">
          <BoardEventFilters
            key={filtersKey}
            search={queryStates.search}
            status={queryStates.status}
            memberStatus={queryStates.memberStatus}
            onSearchChange={onSearchChange}
            onFilterChange={onFilterChange}
          />

          <BoardEventCardList
            data={events}
            // isPending covers the first load and every new filter key (no cached data)
            isLoading={isPending}
            isError={isError}
            isFiltered={isFiltered}
            page={queryStates.page}
            pageCount={meta?.total_page || 1}
            rowCount={meta?.total_all_data || 0}
            onRetry={() => refetch()}
            onReset={onReset}
            onPageChange={onPageChange}
          />
        </div>
      </main>
    </div>
  );
}
