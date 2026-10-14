import { TriangleAlert } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/app/_components/ui/empty";

import type { TBoardStoryErrorStateProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/_types/board-story-components-props";

export default function BoardStoryErrorState({
  title = "Could not load your stories",
  onRetry,
}: TBoardStoryErrorStateProps) {
  return (
    <Empty
      role="alert"
      className="rounded-xl border border-solid bg-card px-6 py-12"
    >
      <EmptyHeader>
        <EmptyMedia className="text-destructive">
          <TriangleAlert className="size-10" />
        </EmptyMedia>
        <EmptyTitle className="font-heading text-xl">{title}</EmptyTitle>
        <EmptyDescription>
          Something went wrong on the way. Please try again.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" onClick={onRetry}>
          Try again
        </Button>
      </EmptyContent>
    </Empty>
  );
}
