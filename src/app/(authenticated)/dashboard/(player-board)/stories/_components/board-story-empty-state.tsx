"use client";

import { ScrollText } from "lucide-react";
import Link from "next/link";

import { Button } from "@/app/_components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/app/_components/ui/empty";
import { useT } from "@/app/_hooks/use-t";

import { BOARD_STORIES_MESSAGES } from "@/app/(authenticated)/dashboard/(player-board)/stories/_messages";
import type { TBoardStoryEmptyStateProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/_types/board-story-components-props";

export default function BoardStoryEmptyState({
  isFiltered,
  onReset,
}: TBoardStoryEmptyStateProps) {
  const { t } = useT(BOARD_STORIES_MESSAGES);

  return (
    <Empty className="rounded-xl border bg-card px-6 py-12">
      <EmptyHeader>
        <EmptyMedia className="text-primary/60">
          <ScrollText className="size-10" />
        </EmptyMedia>
        <EmptyTitle className="font-heading text-xl">
          {isFiltered ? t("empty.filteredTitle") : t("empty.title")}
        </EmptyTitle>
        <EmptyDescription>
          {isFiltered
            ? t("empty.filteredDescription")
            : t("empty.description")}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {isFiltered ? (
          <Button variant="outline" onClick={onReset}>
            {t("empty.clearFilters")}
          </Button>
        ) : (
          <Button render={<Link href="/stories" />} nativeButton={false}>
            {t("empty.browse")}
          </Button>
        )}
      </EmptyContent>
    </Empty>
  );
}
