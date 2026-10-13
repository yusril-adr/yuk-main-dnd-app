import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { generatePages } from "@/utils/table-helper";
import { PUBLIC_STORY_PAGE_SIZE } from "@/app/(public)/stories/_constants/public-story-page-size";

import type { TPublicStoryPaginationProps } from "@/app/(public)/stories/_types/public-story-components-props";

export default function PublicStoryPagination({
  page,
  pageCount,
  rowCount,
  itemCount,
  onPageChange,
}: TPublicStoryPaginationProps) {
  const pages = useMemo(
    () => generatePages({ currentPage: page, totalPages: pageCount }),
    [page, pageCount],
  );
  const dataStartIndex = (page - 1) * PUBLIC_STORY_PAGE_SIZE;
  const indexStart = rowCount === 0 ? 0 : dataStartIndex + 1;
  const indexEnd = Math.min(dataStartIndex + itemCount, rowCount);

  return (
    <div className="flex flex-col-reverse items-center justify-between gap-3 rounded-2xl border bg-card px-3 py-3 sm:flex-row sm:px-4">
      <span className="text-xs text-muted-foreground sm:text-sm">
        Showing{" "}
        <span className="font-medium text-foreground">
          {indexStart}–{indexEnd}
        </span>{" "}
        of <span className="font-medium text-foreground">{rowCount}</span>{" "}
        stories
      </span>

      <div className="flex flex-wrap items-center justify-center gap-0.5 sm:gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-full"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft />
        </Button>
        {pages.map((item) => (
          <Button
            key={item}
            variant={item === page ? "default" : "ghost"}
            size="icon-sm"
            className="rounded-full"
            aria-current={item === page ? "page" : undefined}
            onClick={() => item !== page && onPageChange(item)}
          >
            {item}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-full"
          aria-label="Next page"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
