"use client";

import { Feather, RotateCw, TriangleAlert } from "lucide-react";
import { Else, If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/app/_components/ui/empty";
import { useT } from "@/app/_hooks/use-t";
import { COMMON_MESSAGES } from "@/messages/common";
import PublicLegendList from "@/app/(public)/_components/public-legend-list";
import PublicLegendPodium from "@/app/(public)/_components/public-legend-podium";
import PublicLegendSkeleton from "@/app/(public)/_components/public-legend-skeleton";
import type { TPublicLegendBoardProps } from "@/app/(public)/_types/public-legend-board-props";

export default function PublicLegendBoard({
  kind,
  title,
  icon: Icon,
  entries,
  isLoading,
  isError,
  onRetry,
  copy,
}: TPublicLegendBoardProps) {
  const { t: tCommon } = useT(COMMON_MESSAGES);

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
              <PublicLegendSkeleton />
            </Then>
            <Else>
              <If condition={isError}>
                <Then>
                  <Empty
                    role="alert"
                    className="gap-3 rounded-md border border-solid border-destructive/30 bg-destructive/5 px-4 py-8"
                  >
                    <EmptyHeader>
                      <EmptyMedia
                        variant="icon"
                        className="mb-1 size-12 rounded-full bg-destructive/10 text-destructive"
                      >
                        <TriangleAlert />
                      </EmptyMedia>
                      <EmptyTitle className="font-heading text-lg">
                        {copy.errorTitle}
                      </EmptyTitle>
                      <EmptyDescription className="text-base">
                        {copy.errorDescription}
                      </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      <Button variant="outline" onClick={onRetry}>
                        <RotateCw /> {tCommon("actions.tryAgain")}
                      </Button>
                    </EmptyContent>
                  </Empty>
                </Then>
                <Else>
                  <If condition={entries.length === 0}>
                    <Then>
                      <Empty className="gap-2 rounded-md border bg-muted/30 px-4 py-10">
                        <EmptyHeader>
                          <EmptyMedia className="mb-0 text-muted-foreground">
                            <Feather aria-hidden className="size-6" />
                          </EmptyMedia>
                          <EmptyDescription className="text-base italic">
                            {copy.empty}
                          </EmptyDescription>
                        </EmptyHeader>
                      </Empty>
                    </Then>
                    <Else>
                      <div className="sm:hidden">
                        <PublicLegendList
                          kind={kind}
                          entries={entries}
                          copy={copy}
                        />
                      </div>
                      <div className="hidden sm:block">
                        <PublicLegendPodium
                          kind={kind}
                          entries={entries}
                          copy={copy}
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
