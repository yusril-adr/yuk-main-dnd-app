import { Castle } from "lucide-react";
import { If, Then } from "react-if";

import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import type { TPublicStoryListHeroProps } from "@/app/(public)/stories/_types/public-story-components-props";

export default function PublicStoryListHero({
  totalStories,
}: TPublicStoryListHeroProps) {
  return (
    // Parchment-like panel: solid muted token, double thin frame
    <Card className="rounded-md bg-muted/40 p-1.5 shadow-none">
      <CardContent className="flex flex-col items-center gap-3 rounded-sm border border-dashed border-primary/30 px-4 py-8 text-center sm:gap-4 sm:px-8 sm:py-12">
        <Castle aria-hidden className="size-8 text-primary sm:size-10" />
        <p className="text-xs tracking-[0.25em] text-primary uppercase">
          The Quest Board
        </p>
        <h1 className="font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
          Seek thy next adventure
        </h1>
        <Separator className="w-40! bg-primary/40 sm:w-56!" />
        <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
          Oneshots and campaigns posted by the guild. Pick a story, join the
          party, and roll for initiative.
        </p>
        <If condition={totalStories !== null}>
          <Then>
            <p className="text-sm text-muted-foreground">
              <span className="font-heading text-xl text-foreground">
                {totalStories}
              </span>{" "}
              {totalStories === 1 ? "story" : "stories"} pinned to the board
            </p>
          </Then>
        </If>
      </CardContent>
    </Card>
  );
}
