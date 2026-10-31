"use client";

import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/app/_components/ui/pagination";
import { useT } from "@/app/_hooks/use-t";
import { generatePages } from "@/utils/table-helper";

import type { THomeGuildPhotoPaginationProps } from "@/app/(public)/_types/home-components-props";

// Same look as the public story list pagination (round ghost buttons, filled
// active page), wraps around at the ends like the carousel
export default function HomeGuildPhotoPagination({
  page,
  pageCount,
  onPageChange,
}: THomeGuildPhotoPaginationProps) {
  const { t } = useT("home");
  const pages = useMemo(
    () => generatePages({ currentPage: page, totalPages: pageCount }),
    [page, pageCount],
  );

  return (
    <Pagination aria-label={t("guild.photosLabel")} className="mx-0 w-auto">
      <PaginationContent className="flex-wrap justify-center gap-0.5 sm:gap-1">
        <PaginationItem>
          <Button
            variant="ghost"
            size="icon-sm"
            className="rounded-full"
            aria-label={t("guild.previousPhoto")}
            onClick={() => onPageChange(page <= 1 ? pageCount : page - 1)}
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>
        {pages.map((item) => (
          <PaginationItem key={item}>
            <Button
              variant={item === page ? "default" : "ghost"}
              size="icon-sm"
              className="rounded-full"
              aria-label={t("guild.photoNumber", { n: item })}
              aria-current={item === page ? "page" : undefined}
              onClick={() => item !== page && onPageChange(item)}
            >
              {item}
            </Button>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            variant="ghost"
            size="icon-sm"
            className="rounded-full"
            aria-label={t("guild.nextPhoto")}
            onClick={() => onPageChange(page >= pageCount ? 1 : page + 1)}
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
