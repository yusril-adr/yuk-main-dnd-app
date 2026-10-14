import { RotateCw, TriangleAlert } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/app/_components/ui/button";
import type { TPublicGuildmateErrorStateProps } from "@/app/(public)/guildmates/_types/public-guildmate-components-props";

export default function PublicGuildmateErrorState({
  title = "The guild roll could not be fetched",
  description = "Something went wrong while loading guildmates. Please try again.",
  onRetry,
  compact = false,
}: TPublicGuildmateErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-md border border-destructive/30 bg-destructive/5 px-4 text-center",
        compact ? "py-8" : "py-10 sm:px-6 sm:py-16",
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive [&>svg]:size-6">
        <TriangleAlert />
      </div>
      <div className="flex max-w-sm flex-col gap-1">
        <h3 className="font-heading text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button variant="outline" onClick={onRetry}>
        <RotateCw /> Try again
      </Button>
    </div>
  );
}
