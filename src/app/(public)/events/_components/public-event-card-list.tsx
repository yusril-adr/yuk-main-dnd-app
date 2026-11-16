"use client";

import { Else, If, Then } from "react-if";

import { useT } from "@/app/_hooks/use-t";
import { PUBLIC_EVENT_PAGE_SIZE } from "@/app/(public)/events/_constants/public-event-page-size";
import { PUBLIC_EVENT_EAGER_CARD_COUNT } from "@/app/(public)/events/_constants/public-event-page-size";
import { EVENTS_MESSAGES } from "@/app/(public)/events/_messages";
import PublicEventCard from "@/app/(public)/_components/public-event-card";
import PublicEventCardSkeleton from "@/app/(public)/_components/public-event-card-skeleton";
import PublicEventEmptyState from "./public-event-empty-state";
import PublicEventErrorState from "./public-event-error-state";
import PublicEventPagination from "./public-event-pagination";
import type { TPublicEventCardListProps } from "@/app/(public)/events/_types/public-event-card-list-props";

export default function PublicEventCardList({
  data,
  isLoading,
  isError,
  onRetry,
  onReset,
  pageCount,
  rowCount,
  queryTable,
  onActionHandler,
}: TPublicEventCardListProps) {
  const { t } = useT(EVENTS_MESSAGES);
  const isFiltered =
    !!queryTable.search ||
    queryTable.status != null ||
    queryTable.locationType != null;

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <If condition={isError && !isLoading}>
        <Then>
          <PublicEventErrorState
            title={t("error.title")}
            description={t("error.description")}
            onRetry={onRetry}
          />
        </Then>
        <Else>
          <If condition={!isLoading && data.length === 0}>
            <Then>
              <PublicEventEmptyState
                isFiltered={isFiltered}
                onReset={onReset}
              />
            </Then>
            <Else>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {isLoading
                  ? Array.from({ length: PUBLIC_EVENT_PAGE_SIZE }).map(
                      (_, idx) => (
                        <PublicEventCardSkeleton key={`skeleton-${idx}`} />
                      ),
                    )
                  : data.map((event, idx) => (
                      <PublicEventCard
                        key={event.id}
                        event={event}
                        priority={idx < PUBLIC_EVENT_EAGER_CARD_COUNT}
                      />
                    ))}
              </div>
            </Else>
          </If>
        </Else>
      </If>

      <If condition={!isLoading && !isError && rowCount > 0}>
        <Then>
          <PublicEventPagination
            page={queryTable.page}
            pageCount={pageCount}
            rowCount={rowCount}
            itemCount={data.length}
            onPageChange={onActionHandler.onPageChange}
          />
        </Then>
      </If>
    </div>
  );
}
