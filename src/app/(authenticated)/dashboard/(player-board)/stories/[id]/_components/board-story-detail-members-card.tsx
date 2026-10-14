"use client";

import { useState } from "react";
import { UserRoundGroup } from "lucide-react";
import { Else, If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";

import BoardStoryDetailMemberRow from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-member-row";
import BoardStoryDetailMembersCardSkeleton from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-members-card-skeleton";
import BoardStoryDetailMembersDialog from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-members-dialog";
import BoardStoryDetailSectionCard from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-section-card";
import { BOARD_STORY_MEMBER_PREVIEW_COUNT } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_constants/board-story-detail";
import { useGetBoardStoryMemberPagination } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_hooks/use-get-board-story-member-pagination";
import type { TBoardStoryDetailMembersCardProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_types/board-story-detail-components-props";

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
                <p className="italic text-muted-foreground">
                  Couldn&apos;t load party members.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => query.refetch()}
                >
                  Try again
                </Button>
              </Then>
              <Else>
                <If condition={items.length === 0}>
                  <Then>
                    <p className="italic text-muted-foreground">
                      No adventurers have joined this party yet.
                    </p>
                  </Then>
                  <Else>
                    <ul className="flex flex-wrap gap-2">
                      {items.map((member) => (
                        <li key={member.id}>
                          <BoardStoryDetailMemberRow
                            member={member}
                            variant="avatar"
                          />
                        </li>
                      ))}
                    </ul>
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
