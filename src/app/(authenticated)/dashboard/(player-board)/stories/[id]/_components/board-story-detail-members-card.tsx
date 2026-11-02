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
import { useT } from "@/app/_hooks/use-t";
import { COMMON_MESSAGES } from "@/messages/common";

import BoardStoryDetailMemberRow from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-member-row";
import BoardStoryDetailMembersCardSkeleton from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-members-card-skeleton";
import BoardStoryDetailMembersDialog from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-members-dialog";
import BoardStoryDetailSectionCard from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-section-card";
import { BOARD_STORY_MEMBER_PREVIEW_COUNT } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_constants/board-story-detail";
import { useGetBoardStoryMemberPagination } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_hooks/use-get-board-story-member-pagination";
import { BOARD_STORY_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_messages";
import type { TBoardStoryDetailMembersCardProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_types/board-story-detail-components-props";

// Read-only: avatar preview, full list in a dialog
export default function BoardStoryDetailMembersCard({
  storyId,
}: TBoardStoryDetailMembersCardProps) {
  const { t } = useT(BOARD_STORY_DETAIL_MESSAGES);
  const { t: tCommon } = useT(COMMON_MESSAGES);
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
          <BoardStoryDetailSectionCard
            icon={UserRoundGroup}
            title={t("party.title")}
          >
            <If condition={query.isError}>
              <Then>
                <Empty className="gap-3 p-4">
                  <EmptyHeader>
                    <EmptyDescription className="italic">
                      {t("party.loadError")}
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => query.refetch()}
                    >
                      {tCommon("actions.tryAgain")}
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
                          {t("party.empty")}
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
                      {t("party.showMore")}
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
