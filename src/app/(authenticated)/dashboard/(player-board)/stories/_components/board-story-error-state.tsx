import { TriangleAlert } from "lucide-react";

import { Button } from "@/app/_components/ui/button";

import type { TBoardStoryErrorStateProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/_types/board-story-components-props";

export default function BoardStoryErrorState({
  title = "Could not load your stories",
  onRetry,
}: TBoardStoryErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-xl border bg-card px-6 py-12 text-center"
    >
      <TriangleAlert className="size-10 text-destructive" />
      <h2 className="font-heading text-xl">{title}</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        Something went wrong on the way. Please try again.
      </p>
      <Button variant="outline" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}
