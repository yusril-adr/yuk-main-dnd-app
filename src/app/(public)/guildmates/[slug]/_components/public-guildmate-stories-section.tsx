"use client";

import { useState } from "react";
import { ChevronDown, ScrollText } from "lucide-react";
import { Else, If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
} from "@/app/_components/ui/empty";
import { Spinner } from "@/app/_components/ui/spinner";
import { Tabs, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";
import PublicGuildmateStoryCard from "@/app/(public)/guildmates/[slug]/_components/public-guildmate-story-card";
import PublicGuildmateStoryCardSkeleton from "@/app/(public)/guildmates/[slug]/_components/public-guildmate-story-card-skeleton";
import PublicGuildmateErrorState from "@/app/(public)/guildmates/_components/public-guildmate-error-state";
import { useGetPublicGuildmateCreatedStories } from "@/app/(public)/guildmates/[slug]/_hooks/use-get-public-guildmate-created-stories";
import { useGetPublicGuildmateJoinedStories } from "@/app/(public)/guildmates/[slug]/_hooks/use-get-public-guildmate-joined-stories";
import { PUBLIC_GUILDMATE_STORY_PAGE_SIZE } from "@/app/(public)/guildmates/[slug]/_constants/public-guildmate-detail";
import type { TPublicGuildmateStoriesSectionProps } from "@/app/(public)/guildmates/[slug]/_types/public-guildmate-detail-components-props";

type TStoryTab = "led" | "joined";

export default function PublicGuildmateStoriesSection({
  identifier,
}: TPublicGuildmateStoriesSectionProps) {
  const [tab, setTab] = useState<TStoryTab>("joined");
  const createdQuery = useGetPublicGuildmateCreatedStories(
    identifier,
    PUBLIC_GUILDMATE_STORY_PAGE_SIZE,
    { enabled: tab === "led" },
  );
  const joinedQuery = useGetPublicGuildmateJoinedStories(
    identifier,
    PUBLIC_GUILDMATE_STORY_PAGE_SIZE,
    { enabled: tab === "joined" },
  );
  const query = tab === "led" ? createdQuery : joinedQuery;
  const stories =
    query.data?.pages.flatMap((page) => page.data?.data?.items ?? []) ?? [];

  return (
    <section className="flex w-full flex-col gap-4 print:hidden">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-heading text-xl sm:text-2xl [&>svg]:size-5 [&>svg]:text-primary">
          <ScrollText aria-hidden />
          Quest Log
        </h2>
        <Tabs value={tab} onValueChange={(value) => setTab(value as TStoryTab)}>
          <TabsList>
            <TabsTrigger
              value="joined"
              className="text-foreground/90 data-active:text-foreground dark:text-foreground/90 dark:data-active:text-foreground"
            >
              Quests joined
            </TabsTrigger>
            <TabsTrigger
              value="led"
              className="text-foreground/90 data-active:text-foreground dark:text-foreground/90 dark:data-active:text-foreground"
            >
              Quests led
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <If condition={query.isError && !query.isLoading}>
        <Then>
          <PublicGuildmateErrorState
            compact
            title="The quest log could not be fetched"
            description="Something went wrong while loading stories. Please try again."
            onRetry={() => query.refetch()}
          />
        </Then>
        <Else>
          <If condition={!query.isLoading && stories.length === 0}>
            <Then>
              <Empty className="rounded-md border border-primary/30 px-4 py-10">
                <EmptyHeader>
                  <EmptyDescription className="italic">
                    {tab === "led"
                      ? "No quests led yet. Their first tale awaits."
                      : "No quests joined yet. The road is still open."}
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </Then>
            <Else>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {query.isLoading
                  ? Array.from({
                      length: PUBLIC_GUILDMATE_STORY_PAGE_SIZE,
                    }).map((_, idx) => (
                      <PublicGuildmateStoryCardSkeleton key={`skeleton-${idx}`} />
                    ))
                  : stories.map((story) => (
                      <PublicGuildmateStoryCard key={story.id} story={story} />
                    ))}
                {query.isFetchingNextPage &&
                  Array.from({ length: 3 }).map((_, idx) => (
                    <PublicGuildmateStoryCardSkeleton key={`next-skeleton-${idx}`} />
                  ))}
              </div>
              <If condition={query.hasNextPage && !query.isLoading}>
                <Then>
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      onClick={() => query.fetchNextPage()}
                      disabled={query.isFetchingNextPage}
                    >
                      <If condition={query.isFetchingNextPage}>
                        <Then>
                          <Spinner /> Loading…
                        </Then>
                        <Else>
                          <ChevronDown /> Load more
                        </Else>
                      </If>
                    </Button>
                  </div>
                </Then>
              </If>
            </Else>
          </If>
        </Else>
      </If>
    </section>
  );
}
