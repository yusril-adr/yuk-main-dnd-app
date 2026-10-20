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

import type { TBoardStoryEmptyStateProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/_types/board-story-components-props";

export default function BoardStoryEmptyState({
  isFiltered,
  onReset,
}: TBoardStoryEmptyStateProps) {
  return (
    <Empty className="rounded-xl border bg-card px-6 py-12">
      <EmptyHeader>
        <EmptyMedia className="text-primary/60">
          <ScrollText className="size-10" />
        </EmptyMedia>
        <EmptyTitle className="font-heading text-xl">
          {isFiltered ? "No stories match" : "No stories yet"}
        </EmptyTitle>
        <EmptyDescription>
          {isFiltered
            ? "Try another title or loosen the filters."
            : "Join a story from the stories board and it will show up here."}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {isFiltered ? (
          <Button variant="outline" onClick={onReset}>
            Clear filters
          </Button>
        ) : (
          <Button render={<Link href="/stories" />} nativeButton={false}>
            Browse stories
          </Button>
        )}
      </EmptyContent>
    </Empty>
  );
}
