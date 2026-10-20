import { useMemo } from "react";

import { Card, CardDescription } from "@/app/_components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/_components/ui/pagination";
import { generatePages } from "@/utils/table-helper";

import { BALANCE_PAGE_SIZE } from "@/app/[locale]/(authenticated)/balances/_constants/balance";
import type { TBalancePaginationProps } from "@/app/[locale]/(authenticated)/balances/_types/balance-components-props";

const DISABLED = "pointer-events-none opacity-50";

export default function BalancePagination({
  page,
  pageCount,
  rowCount,
  itemCount,
  onPageChange,
}: TBalancePaginationProps) {
  const pages = useMemo(
    () => generatePages({ currentPage: page, totalPages: pageCount }),
    [page, pageCount],
  );
  const start = (page - 1) * BALANCE_PAGE_SIZE;
  const indexStart = rowCount === 0 ? 0 : start + 1;
  const indexEnd = Math.min(start + itemCount, rowCount);

  const go = (target: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    if (target >= 1 && target <= pageCount && target !== page)
      onPageChange(target);
  };

  return (
    <Card
      size="sm"
      className="flex-col-reverse items-center justify-between gap-3 px-3 sm:flex-row sm:px-4"
    >
      <CardDescription>
        Showing {indexStart}–{indexEnd} of {rowCount}
      </CardDescription>
      <Pagination aria-label="Ledger pages" className="mx-0 w-auto">
        <PaginationContent className="flex-wrap justify-center">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              text=""
              aria-label="Previous page"
              aria-disabled={page <= 1}
              className={page <= 1 ? DISABLED : undefined}
              onClick={go(page - 1)}
            />
          </PaginationItem>
          {pages.map((item) => (
            <PaginationItem key={item}>
              <PaginationLink
                href="#"
                size="icon-sm"
                isActive={item === page}
                onClick={go(item)}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              text=""
              aria-label="Next page"
              aria-disabled={page >= pageCount}
              className={page >= pageCount ? DISABLED : undefined}
              onClick={go(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Card>
  );
}
