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

import BoardEventDetailMemberRow from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_components/board-event-detail-member-row";
import BoardEventDetailMembersCardSkeleton from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_components/board-event-detail-members-card-skeleton";
import BoardEventDetailMembersDialog from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_components/board-event-detail-members-dialog";
import BoardEventDetailSectionCard from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_components/board-event-detail-section-card";
import { BOARD_EVENT_MEMBER_PREVIEW_COUNT } from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_constants/board-event-detail";
import { useGetBoardEventMemberPagination } from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_hooks/use-get-board-event-member-pagination";
import { BOARD_EVENT_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_messages";
import type { TBoardEventDetailMembersCardProps } from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_types/board-event-detail-components-props";

// Read-only: avatar preview, full list in a dialog
export default function BoardEventDetailMembersCard({
  eventId,
}: TBoardEventDetailMembersCardProps) {
  const { t } = useT(BOARD_EVENT_DETAIL_MESSAGES);
  const { t: tCommon } = useT(COMMON_MESSAGES);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const query = useGetBoardEventMemberPagination(
    eventId,
    BOARD_EVENT_MEMBER_PREVIEW_COUNT,
  );
  const items = query.data?.pages[0]?.data?.data?.items ?? [];

  return (
    <>
      <If condition={query.isPending}>
        <Then>
          <BoardEventDetailMembersCardSkeleton />
        </Then>
        <Else>
          <BoardEventDetailSectionCard
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
                        <BoardEventDetailMemberRow
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
          </BoardEventDetailSectionCard>
        </Else>
      </If>
      <BoardEventDetailMembersDialog
        eventId={eventId}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}
