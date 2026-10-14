import { ScrollText } from "lucide-react";
import Link from "next/link";

import { Button } from "@/app/_components/ui/button";

import type { TBoardStoryEmptyStateProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/_types/board-story-components-props";

export default function BoardStoryEmptyState({
  isFiltered,
  onReset,
}: TBoardStoryEmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed bg-card px-6 py-12 text-center">
      <ScrollText className="size-10 text-primary/60" />
      <h2 className="font-heading text-xl">
        {isFiltered ? "No stories match" : "No stories yet"}
      </h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        {isFiltered
          ? "Try another title or loosen the filters."
          : "Join a quest from the stories board and it will show up here."}
      </p>
      {isFiltered ? (
        <Button variant="outline" onClick={onReset}>
          Clear filters
        </Button>
      ) : (
        <Button render={<Link href="/stories" />} nativeButton={false}>
          Browse stories
        </Button>
      )}
    </div>
  );
}
