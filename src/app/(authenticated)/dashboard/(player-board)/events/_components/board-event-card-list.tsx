"use client";

import { Case, Default, Switch } from "react-if";

import { useT } from "@/app/_hooks/use-t";

import BoardEventCard from "@/app/(authenticated)/dashboard/(player-board)/events/_components/board-event-card";
import BoardEventCardSkeleton from "@/app/(authenticated)/dashboard/(player-board)/events/_components/board-event-card-skeleton";
import BoardEventEmptyState from "@/app/(authenticated)/dashboard/(player-board)/events/_components/board-event-empty-state";
import BoardEventErrorState from "@/app/(authenticated)/dashboard/(player-board)/events/_components/board-event-error-state";
import BoardEventPagination from "@/app/(authenticated)/dashboard/(player-board)/events/_components/board-event-pagination";
import { BOARD_EVENTS_MESSAGES } from "@/app/(authenticated)/dashboard/(player-board)/events/_messages";
import type { TBoardEventCardListProps } from "@/app/(authenticated)/dashboard/(player-board)/events/_types/board-event-components-props";

const GRID = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

export default function BoardEventCardList({
  data,
  isLoading,
  isError,
  isFiltered,
  page,
  pageCount,
  rowCount,
  onRetry,
  onReset,
  onPageChange,
}: TBoardEventCardListProps) {
  const { t } = useT(BOARD_EVENTS_MESSAGES);

  return (
    <Switch>
      <Case condition={isLoading}>
        <div className={GRID} aria-busy>
          {Array.from({ length: 6 }, (_, i) => (
            <BoardEventCardSkeleton key={i} />
          ))}
        </div>
      </Case>
      <Case condition={isError}>
        <BoardEventErrorState
          title={t("error.title")}
          description={t("error.description")}
          onRetry={onRetry}
        />
      </Case>
      <Case condition={data.length === 0}>
        <BoardEventEmptyState isFiltered={isFiltered} onReset={onReset} />
      </Case>
      <Default>
        <div className="flex flex-col gap-4">
          <div className={GRID}>
            {data.map((event) => (
              <BoardEventCard key={event.id} event={event} />
            ))}
          </div>
          <BoardEventPagination
            page={page}
            pageCount={pageCount}
            rowCount={rowCount}
            itemCount={data.length}
            onPageChange={onPageChange}
          />
        </div>
      </Default>
    </Switch>
  );
}
