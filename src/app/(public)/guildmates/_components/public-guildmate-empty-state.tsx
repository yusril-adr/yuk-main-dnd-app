import { Users } from "lucide-react";
import { If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/app/_components/ui/empty";
import type { TPublicGuildmateEmptyStateProps } from "@/app/(public)/guildmates/_types/public-guildmate-components-props";

export default function PublicGuildmateEmptyState({
  isFiltered,
  onReset,
}: TPublicGuildmateEmptyStateProps) {
  return (
    <Empty className="rounded-md border bg-muted/30 px-4 py-10 sm:px-6 sm:py-16">
      <EmptyHeader>
        <EmptyMedia
          variant="icon"
          className="size-14 rounded-full bg-primary/10 text-primary sm:size-16 [&_svg:not([class*='size-'])]:size-7"
        >
          <Users />
        </EmptyMedia>
        <EmptyTitle className="font-heading text-lg sm:text-xl">
          No guildmates found
        </EmptyTitle>
        <EmptyDescription>
          {isFiltered
            ? "No adventurer answers to that name. Try different keywords."
            : "The guild hall stands empty for now. Return soon, adventurer."}
        </EmptyDescription>
      </EmptyHeader>
      <If condition={isFiltered}>
        <Then>
          <EmptyContent>
            <Button variant="outline" onClick={onReset}>
              Clear search
            </Button>
          </EmptyContent>
        </Then>
      </If>
    </Empty>
  );
}
