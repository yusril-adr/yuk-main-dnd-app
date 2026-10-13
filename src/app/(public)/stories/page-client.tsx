"use client";

import { useCallback, useMemo, useState } from "react";
import { createParser, parseAsInteger, parseAsString } from "nuqs";

import { useCamelCaseQueryStates } from "@/libs/nuqs/use-camel-case-query-states";
import type { TPublicStoryPaginationPayload } from "@/api/main/modules/stories/types/public-story-pagination-payload";
import { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";

import PublicStoryListHero from "@/app/(public)/stories/_components/public-story-list-hero";
import PublicStoryFilters from "@/app/(public)/stories/_components/public-story-filters";
import PublicStoryCardList from "@/app/(public)/stories/_components/public-story-card-list";
import { useGetPublicStoryPagination } from "@/app/(public)/stories/_hooks/use-get-public-story-pagination";
import { PUBLIC_STORY_PAGE_SIZE } from "@/app/(public)/stories/_constants/public-story-page-size";
import { PUBLIC_STORY_STATUS_OPTIONS } from "@/app/(public)/stories/_constants/public-story-status-options";
import type {
  TPublicStoryCardListFilters,
  TPublicStoryStatus,
} from "@/app/(public)/stories/_types/public-story-card-list-props";

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

export default function StoriesPageClient() {
  const [queryStates, setQueryStates] = useCamelCaseQueryStates({
    page: parseAsInteger.withDefault(1),
    search: parseAsString.withDefault(""),
    status: parseAsNumericValues<TPublicStoryStatus>(
      PUBLIC_STORY_STATUS_OPTIONS,
    ),
    type: parseAsNumericValues(numericEnumValues(StoryTypeEnum)),
    locationType: parseAsNumericValues(
      numericEnumValues(StoryLocationTypeEnum),
    ),
  });

  const queryStatesIntoPayload: TPublicStoryPaginationPayload = useMemo(
    () => ({
      page: queryStates.page,
      per_page: PUBLIC_STORY_PAGE_SIZE,
      search: queryStates.search,
      // nuqs parsers return null when unset, but API expects undefined — coalesce
      status: queryStates.status ?? undefined,
      type: queryStates.type ?? undefined,
      location_type: queryStates.locationType ?? undefined,
    }),
    [queryStates],
  );

  const {
    data: responseData,
    isLoading,
    isError,
    refetch,
  } = useGetPublicStoryPagination(queryStatesIntoPayload);
  // Remounts the uncontrolled search input and the filter popover after a reset
  const [filtersKey, setFiltersKey] = useState(0);

  const stories = useMemo(
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
    (filters: TPublicStoryCardListFilters) => {
      setQueryStates({ ...filters, page: 1 });
    },
    [setQueryStates],
  );

  const onReset = useCallback(() => {
    setQueryStates({
      search: "",
      page: 1,
      status: null,
      type: null,
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

  const totalStories = responseData?.data?.data?.meta?.total_all_data;

  return (
    <div className="w-full flex justify-center min-w-0">
      <main className="w-full max-w-7xl flex flex-col gap-6 px-4 pt-2 pb-10 sm:gap-8 sm:px-6 sm:pb-16 lg:px-10">
        <PublicStoryListHero totalStories={totalStories ?? null} />

        <PublicStoryFilters
          key={filtersKey}
          queryTable={queryStates}
          onSearchChange={onSearchChange}
          onFilterApply={onFilterApply}
        />

        <PublicStoryCardList
          data={stories}
          isLoading={isLoading}
          isError={isError}
          onRetry={() => refetch()}
          onReset={onReset}
          pageCount={responseData?.data?.data?.meta?.total_page || 1}
          rowCount={totalStories || 0}
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
