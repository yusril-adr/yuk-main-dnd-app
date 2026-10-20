"use client";

import { useState } from "react";
import { UserRoundGroup } from "lucide-react";
import { Else, If, Then } from "react-if";

import { AvatarGroup } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
} from "@/app/_components/ui/empty";

import BoardStoryDetailMemberRow from "@/app/[locale]/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-member-row";
import BoardStoryDetailMembersCardSkeleton from "@/app/[locale]/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-members-card-skeleton";
import BoardStoryDetailMembersDialog from "@/app/[locale]/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-members-dialog";
import BoardStoryDetailSectionCard from "@/app/[locale]/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-section-card";
import { BOARD_STORY_MEMBER_PREVIEW_COUNT } from "@/app/[locale]/(authenticated)/dashboard/(player-board)/stories/[id]/_constants/board-story-detail";
import { useGetBoardStoryMemberPagination } from "@/app/[locale]/(authenticated)/dashboard/(player-board)/stories/[id]/_hooks/use-get-board-story-member-pagination";
import type { TBoardStoryDetailMembersCardProps } from "@/app/[locale]/(authenticated)/dashboard/(player-board)/stories/[id]/_types/board-story-detail-components-props";

// Read-only: avatar preview, full list in a dialog
export default function BoardStoryDetailMembersCard({
  storyId,
}: TBoardStoryDetailMembersCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const query = useGetBoardStoryMemberPagination(
    storyId,
    BOARD_STORY_MEMBER_PREVIEW_COUNT,
  );
  const items = query.data?.pages[0]?.data?.data?.items ?? [];

  return (
    <>
      <If condition={query.isPending}>
        <Then>
          <BoardStoryDetailMembersCardSkeleton />
        </Then>
        <Else>
          <BoardStoryDetailSectionCard icon={UserRoundGroup} title="Party">
            <If condition={query.isError}>
              <Then>
                <Empty className="gap-3 p-4">
                  <EmptyHeader>
                    <EmptyDescription className="italic">
                      Couldn&apos;t load party members.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => query.refetch()}
                    >
                      Try again
                    </Button>
                  </EmptyContent>
                </Empty>
              </Then>
              <Else>
                <If condition={items.length === 0}>
                  <Then>
                    <Empty className="p-4">
                      <EmptyHeader>
                        <EmptyDescription className="italic">
                          No adventurers have joined this party yet.
                        </EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  </Then>
                  <Else>
                    <AvatarGroup className="flex-wrap">
                      {items.map((member) => (
                        <BoardStoryDetailMemberRow
                          key={member.id}
                          member={member}
                          variant="avatar"
                        />
                      ))}
                    </AvatarGroup>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsDialogOpen(true)}
                    >
                      Show more
                    </Button>
                  </Else>
                </If>
              </Else>
            </If>
          </BoardStoryDetailSectionCard>
        </Else>
      </If>
      <BoardStoryDetailMembersDialog
        storyId={storyId}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}
