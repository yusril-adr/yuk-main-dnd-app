import { RotateCw, TriangleAlert } from "lucide-react";

import { Button } from "@/app/_components/ui/button";

import type { TPublicStoryErrorStateProps } from "@/app/[locale]/(public)/stories/_types/public-story-components-props";

export default function PublicStoryErrorState({
  title = "The scrolls could not be fetched",
  description = "Something went wrong while loading stories. Please try again.",
  onRetry,
}: TPublicStoryErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-10 sm:px-6 sm:py-16 text-center">
      <div className="flex size-14 items-center sm:size-16 justify-center rounded-full bg-destructive/10 text-destructive [&>svg]:size-7">
        <TriangleAlert />
      </div>
      <div className="flex max-w-sm flex-col gap-1">
        <h3 className="font-heading text-lg sm:text-xl">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button variant="outline" onClick={onRetry}>
        <RotateCw /> Try again
      </Button>
    </div>
  );
}
