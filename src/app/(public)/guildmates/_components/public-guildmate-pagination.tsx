"use client";

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
import { useT } from "@/app/_hooks/use-t";
import { GUILDMATES_MESSAGES } from "@/app/(public)/guildmates/_messages";
import { generatePages } from "@/utils/table-helper";
import { PUBLIC_GUILDMATE_PAGE_SIZE } from "@/app/(public)/guildmates/_constants/public-guildmate-page-size";

import type { TPublicGuildmatePaginationProps } from "@/app/(public)/guildmates/_types/public-guildmate-components-props";

const DISABLED = "pointer-events-none opacity-50";

export default function PublicGuildmatePagination({
  page,
  pageCount,
  rowCount,
  itemCount,
  onPageChange,
}: TPublicGuildmatePaginationProps) {
  const { t } = useT(GUILDMATES_MESSAGES);
  const pages = useMemo(
    () => generatePages({ currentPage: page, totalPages: pageCount }),
    [page, pageCount],
  );
  const dataStartIndex = (page - 1) * PUBLIC_GUILDMATE_PAGE_SIZE;
  const indexStart = rowCount === 0 ? 0 : dataStartIndex + 1;
  const indexEnd = Math.min(dataStartIndex + itemCount, rowCount);

  const go = (target: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    if (target >= 1 && target <= pageCount && target !== page)
      onPageChange(target);
  };

  return (
    <Card
      size="sm"
      className="flex-col-reverse items-center justify-between gap-3 rounded-md px-3 shadow-none sm:flex-row sm:px-4"
    >
      <CardDescription className="text-xs sm:text-sm">
        {t("pagination.showing", {
          start: indexStart,
          end: indexEnd,
          total: rowCount,
        })}
      </CardDescription>

      <Pagination aria-label={t("pagination.pagesAria")} className="mx-0 w-auto">
        <PaginationContent className="flex-wrap justify-center gap-0.5 sm:gap-1">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              text=""
              aria-label={t("pagination.previous")}
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
                className="rounded-full"
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
              aria-label={t("pagination.next")}
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
