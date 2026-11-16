"use client";

import { Scroll } from "lucide-react";
import { Else, If, Then } from "react-if";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
} from "@/app/_components/ui/empty";
import RichTextContent from "@/app/_components/rich-text-content";
import { useT } from "@/app/_hooks/use-t";

import BoardEventDetailCopyDescriptionButton from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_components/board-event-detail-copy-description-button";
import BoardEventDetailSectionCard from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_components/board-event-detail-section-card";
import { BOARD_EVENT_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_messages";
import type { TBoardEventDetailCardProps } from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_types/board-event-detail-components-props";

export default function BoardEventDetailQuestCard({
  event,
  className,
}: TBoardEventDetailCardProps) {
  const { t } = useT(BOARD_EVENT_DETAIL_MESSAGES);

  return (
    <BoardEventDetailSectionCard
      icon={Scroll}
      title={t("quest.title")}
      className={className}
      action={
        event.description ? (
          <BoardEventDetailCopyDescriptionButton
            description={event.description}
          />
        ) : undefined
      }
    >
      <If condition={!!event.description}>
        <Then>
          <RichTextContent
            value={event.description as string}
            className="text-base"
          />
        </Then>
        <Else>
          <Empty className="p-6">
            <EmptyHeader>
              <EmptyDescription className="italic">
                {t("quest.empty")}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </Else>
      </If>
    </BoardEventDetailSectionCard>
  );
}
