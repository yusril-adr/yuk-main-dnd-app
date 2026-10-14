import { Users } from "lucide-react";
import { If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import type { TPublicGuildmateEmptyStateProps } from "@/app/(public)/guildmates/_types/public-guildmate-components-props";

export default function PublicGuildmateEmptyState({
  isFiltered,
  onReset,
}: TPublicGuildmateEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-dashed bg-muted/30 px-4 py-10 text-center sm:px-6 sm:py-16">
      <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary sm:size-16 [&>svg]:size-7">
        <Users />
      </div>
      <div className="flex max-w-sm flex-col gap-1">
        <h3 className="font-heading text-lg sm:text-xl">No guildmates found</h3>
        <p className="text-sm text-muted-foreground">
          {isFiltered
            ? "No adventurer answers to that name. Try different keywords."
            : "The guild hall stands empty for now. Return soon, adventurer."}
        </p>
      </div>
      <If condition={isFiltered}>
        <Then>
          <Button variant="outline" onClick={onReset}>
            Clear search
          </Button>
        </Then>
      </If>
    </div>
  );
}
