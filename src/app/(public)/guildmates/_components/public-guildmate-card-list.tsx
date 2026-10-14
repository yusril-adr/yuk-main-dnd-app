import { Else, If, Then } from "react-if";

import PublicGuildmateCard from "./public-guildmate-card";
import PublicGuildmateCardSkeleton from "./public-guildmate-card-skeleton";
import PublicGuildmateEmptyState from "./public-guildmate-empty-state";
import PublicGuildmateErrorState from "./public-guildmate-error-state";
import PublicGuildmatePagination from "./public-guildmate-pagination";
import { PUBLIC_GUILDMATE_PAGE_SIZE } from "@/app/(public)/guildmates/_constants/public-guildmate-page-size";
import type { TPublicGuildmateCardListProps } from "@/app/(public)/guildmates/_types/public-guildmate-components-props";

export default function PublicGuildmateCardList({
  data,
  isLoading,
  isError,
  onRetry,
  onReset,
  pageCount,
  rowCount,
  page,
  search,
  onPageChange,
}: TPublicGuildmateCardListProps) {
  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <If condition={isError && !isLoading}>
        <Then>
          <PublicGuildmateErrorState onRetry={onRetry} />
        </Then>
        <Else>
          <If condition={!isLoading && data.length === 0}>
            <Then>
              <PublicGuildmateEmptyState
                isFiltered={!!search}
                onReset={onReset}
              />
            </Then>
            <Else>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {isLoading
                  ? Array.from({ length: PUBLIC_GUILDMATE_PAGE_SIZE }).map(
                      (_, idx) => (
                        <PublicGuildmateCardSkeleton key={`skeleton-${idx}`} />
                      ),
                    )
                  : data.map((guildmate) => (
                      <PublicGuildmateCard
                        key={guildmate.id}
                        guildmate={guildmate}
                      />
                    ))}
              </div>
            </Else>
          </If>
        </Else>
      </If>

      <If condition={!isLoading && !isError && rowCount > 0}>
        <Then>
          <PublicGuildmatePagination
            page={page}
            pageCount={pageCount}
            rowCount={rowCount}
            itemCount={data.length}
            onPageChange={onPageChange}
          />
        </Then>
      </If>
    </div>
  );
}
