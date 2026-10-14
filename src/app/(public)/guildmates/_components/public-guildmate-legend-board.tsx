import { Feather } from "lucide-react";
import { Else, If, Then } from "react-if";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from "@/app/_components/ui/empty";
import PublicGuildmateLegendList from "./public-guildmate-legend-list";
import PublicGuildmateLegendPodium from "./public-guildmate-legend-podium";
import PublicGuildmateLegendSkeleton from "./public-guildmate-legend-skeleton";
import PublicGuildmateErrorState from "./public-guildmate-error-state";
import { PUBLIC_GUILDMATE_LEGEND_EMPTY_TEXT } from "@/app/(public)/guildmates/_constants/public-guildmate-legend-rank";
import type { TPublicGuildmateLegendBoardProps } from "@/app/(public)/guildmates/_types/public-guildmate-components-props";

export default function PublicGuildmateLegendBoard({
  kind,
  title,
  icon: Icon,
  entries,
  isLoading,
  isError,
  onRetry,
}: TPublicGuildmateLegendBoardProps) {
  return (
    // Scroll-like board: double thin frame, solid background
    <Card className="h-full rounded-md p-1.5 shadow-none">
      <div className="flex h-full flex-col gap-4 rounded-sm border border-primary/20 py-4 sm:py-5">
        <CardHeader className="px-4 sm:px-5">
          <CardTitle className="flex items-center gap-2 font-heading text-lg sm:text-xl">
            <Icon aria-hidden className="size-5 text-primary" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-end px-4 sm:px-5">
          <If condition={isLoading}>
            <Then>
              <PublicGuildmateLegendSkeleton />
            </Then>
            <Else>
              <If condition={isError}>
                <Then>
                  <PublicGuildmateErrorState
                    compact
                    title="The legends are lost to the mist"
                    description="We could not read this board. Please try again."
                    onRetry={onRetry}
                  />
                </Then>
                <Else>
                  <If condition={entries.length === 0}>
                    <Then>
                      <Empty className="gap-2 rounded-md border bg-muted/30 px-4 py-10">
                        <EmptyHeader>
                          <EmptyMedia className="mb-0 text-muted-foreground">
                            <Feather aria-hidden className="size-6" />
                          </EmptyMedia>
                          <EmptyDescription className="italic">
                            {PUBLIC_GUILDMATE_LEGEND_EMPTY_TEXT}
                          </EmptyDescription>
                        </EmptyHeader>
                      </Empty>
                    </Then>
                    <Else>
                      <div className="sm:hidden">
                        <PublicGuildmateLegendList
                          kind={kind}
                          entries={entries}
                        />
                      </div>
                      <div className="hidden sm:block">
                        <PublicGuildmateLegendPodium
                          kind={kind}
                          entries={entries}
                        />
                      </div>
                    </Else>
                  </If>
                </Else>
              </If>
            </Else>
          </If>
        </CardContent>
      </div>
    </Card>
  );
}
