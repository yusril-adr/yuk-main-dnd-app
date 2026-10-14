import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { generatePages } from "@/utils/table-helper";

import { BOARD_STORY_PAGE_SIZE } from "@/app/(authenticated)/dashboard/(player-board)/stories/_constants/board-story";
import type { TBoardStoryPaginationProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/_types/board-story-components-props";

export default function BoardStoryPagination({
  page,
  pageCount,
  rowCount,
  itemCount,
  onPageChange,
}: TBoardStoryPaginationProps) {
  const pages = useMemo(
    () => generatePages({ currentPage: page, totalPages: pageCount }),
    [page, pageCount],
  );
  const start = (page - 1) * BOARD_STORY_PAGE_SIZE;
  const indexStart = rowCount === 0 ? 0 : start + 1;
  const indexEnd = Math.min(start + itemCount, rowCount);

  return (
    <nav
      aria-label="Stories pages"
      className="flex flex-col-reverse items-center justify-between gap-3 rounded-xl border bg-card px-3 py-3 sm:flex-row sm:px-4"
    >
      <span className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">
          {indexStart}–{indexEnd}
        </span>{" "}
        of <span className="font-medium text-foreground">{rowCount}</span>
      </span>

      <div className="flex flex-wrap items-center justify-center gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
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
            aria-current={item === page ? "page" : undefined}
            onClick={() => item !== page && onPageChange(item)}
          >
            {item}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Next page"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight />
        </Button>
      </div>
    </nav>
  );
}
