"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { Case, Default, Switch } from "react-if";

import { Button } from "@/app/_components/ui/button";
import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";

import BoardStoryErrorState from "@/app/(authenticated)/dashboard/(player-board)/stories/_components/board-story-error-state";
import BoardStoryDetailHero from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-hero";
import BoardStoryDetailQuestCard from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-quest-card";
import BoardStoryDetailAdventureCard from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-adventure-card";
import BoardStoryDetailChronicleCard from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-chronicle-card";
import BoardStoryDetailMembersCard from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-members-card";
import BoardStoryDetailSkeleton from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-skeleton";
import { useGetBoardStoryById } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_hooks/use-get-board-story-by-id";
import { useGetBoardStoryMemberPagination } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_hooks/use-get-board-story-member-pagination";
import { BOARD_STORY_MEMBER_PREVIEW_COUNT } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_constants/board-story-detail";

export default function BoardStoryDetailPageClient() {
  const { id } = useParams();
  const storyId = id as string;

  const storyQuery = useGetBoardStoryById(storyId);
  // Same key as the members card, so its list loads alongside the story
  // instead of after it
  useGetBoardStoryMemberPagination(storyId, BOARD_STORY_MEMBER_PREVIEW_COUNT);
  const story = storyQuery.data?.data?.data;
  const isNotFound =
    storyQuery.isError && storyQuery.error instanceof MainAPINotFoundError;

  useEffect(() => {
    // Unknown id, or a story the viewer is not a member of
    if (isNotFound) notFound();
  }, [isNotFound]);

  return (
    <div className="w-full flex justify-center min-w-0">
      <main className="w-full max-w-7xl flex flex-col px-4 pb-10 sm:px-6 lg:px-10">
        <AppBreadcrumb
          items={[
            { name: "My Stories", link: "/dashboard/stories" },
            { name: story?.title ?? "Detail" },
          ]}
        />

        <div className="flex items-center mt-4 mb-6 gap-x-2">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Back to My Stories"
            render={<Link href="/dashboard/stories" />}
            nativeButton={false}
          >
            <ArrowLeft />
          </Button>
          <h1 className="font-heading text-2xl">Story Detail</h1>
        </div>

        <Switch>
          <Case condition={storyQuery.isPending}>
            <BoardStoryDetailSkeleton />
          </Case>
          <Case condition={!story && !isNotFound}>
            <BoardStoryErrorState
              title="Could not load this story"
              onRetry={() => storyQuery.refetch()}
            />
          </Case>
          <Default>
            {story && (
              <div className="flex flex-col gap-6">
                <BoardStoryDetailHero story={story} />
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <BoardStoryDetailQuestCard
                    story={story}
                    className="max-lg:hidden lg:col-span-2 lg:self-start"
                  />
                  <div className="flex flex-col gap-6">
                    <BoardStoryDetailAdventureCard story={story} />
                    <BoardStoryDetailChronicleCard story={story} />
                    <BoardStoryDetailMembersCard storyId={storyId} />
                  </div>
                  <BoardStoryDetailQuestCard
                    story={story}
                    className="lg:hidden"
                  />
                </div>
              </div>
            )}
          </Default>
        </Switch>
      </main>
    </div>
  );
}
