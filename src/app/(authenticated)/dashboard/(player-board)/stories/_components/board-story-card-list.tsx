"use client";

import { Case, Default, Switch } from "react-if";

import { useT } from "@/app/_hooks/use-t";

import BoardStoryCard from "@/app/(authenticated)/dashboard/(player-board)/stories/_components/board-story-card";
import BoardStoryCardSkeleton from "@/app/(authenticated)/dashboard/(player-board)/stories/_components/board-story-card-skeleton";
import BoardStoryEmptyState from "@/app/(authenticated)/dashboard/(player-board)/stories/_components/board-story-empty-state";
import BoardStoryErrorState from "@/app/(authenticated)/dashboard/(player-board)/stories/_components/board-story-error-state";
import BoardStoryPagination from "@/app/(authenticated)/dashboard/(player-board)/stories/_components/board-story-pagination";
import { BOARD_STORIES_MESSAGES } from "@/app/(authenticated)/dashboard/(player-board)/stories/_messages";
import type { TBoardStoryCardListProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/_types/board-story-components-props";

const GRID = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

export default function BoardStoryCardList({
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
}: TBoardStoryCardListProps) {
  const { t } = useT(BOARD_STORIES_MESSAGES);

  return (
    <Switch>
      <Case condition={isLoading}>
        <div className={GRID} aria-busy>
          {Array.from({ length: 6 }, (_, i) => (
            <BoardStoryCardSkeleton key={i} />
          ))}
        </div>
      </Case>
      <Case condition={isError}>
        <BoardStoryErrorState
          title={t("error.title")}
          description={t("error.description")}
          onRetry={onRetry}
        />
      </Case>
      <Case condition={data.length === 0}>
        <BoardStoryEmptyState isFiltered={isFiltered} onReset={onReset} />
      </Case>
      <Default>
        <div className="flex flex-col gap-4">
          <div className={GRID}>
            {data.map((story) => (
              <BoardStoryCard key={story.id} story={story} />
            ))}
          </div>
          <BoardStoryPagination
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
