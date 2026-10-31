"use client";

import { Else, If, Then } from "react-if";

import { useT } from "@/app/_hooks/use-t";
import { PUBLIC_STORY_PAGE_SIZE } from "@/app/(public)/stories/_constants/public-story-page-size";
import { PUBLIC_STORY_EAGER_CARD_COUNT } from "@/app/(public)/stories/_constants/public-story-page-size";
import { STORIES_MESSAGES } from "@/app/(public)/stories/_messages";
import PublicStoryCard from "./public-story-card";
import PublicStoryCardSkeleton from "./public-story-card-skeleton";
import PublicStoryEmptyState from "./public-story-empty-state";
import PublicStoryErrorState from "./public-story-error-state";
import PublicStoryPagination from "./public-story-pagination";
import type { TPublicStoryCardListProps } from "@/app/(public)/stories/_types/public-story-card-list-props";

export default function PublicStoryCardList({
  data,
  isLoading,
  isError,
  onRetry,
  onReset,
  pageCount,
  rowCount,
  queryTable,
  onActionHandler,
}: TPublicStoryCardListProps) {
  const { t } = useT(STORIES_MESSAGES);
  const isFiltered =
    !!queryTable.search ||
    queryTable.status != null ||
    queryTable.type != null ||
    queryTable.locationType != null;

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <If condition={isError && !isLoading}>
        <Then>
          <PublicStoryErrorState
            title={t("error.title")}
            description={t("error.description")}
            onRetry={onRetry}
          />
        </Then>
        <Else>
          <If condition={!isLoading && data.length === 0}>
            <Then>
              <PublicStoryEmptyState
                isFiltered={isFiltered}
                onReset={onReset}
              />
            </Then>
            <Else>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {isLoading
                  ? Array.from({ length: PUBLIC_STORY_PAGE_SIZE }).map(
                      (_, idx) => (
                        <PublicStoryCardSkeleton key={`skeleton-${idx}`} />
                      ),
                    )
                  : data.map((story, idx) => (
                      <PublicStoryCard
                        key={story.id}
                        story={story}
                        priority={idx < PUBLIC_STORY_EAGER_CARD_COUNT}
                      />
                    ))}
              </div>
            </Else>
          </If>
        </Else>
      </If>

      <If condition={!isLoading && !isError && rowCount > 0}>
        <Then>
          <PublicStoryPagination
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
