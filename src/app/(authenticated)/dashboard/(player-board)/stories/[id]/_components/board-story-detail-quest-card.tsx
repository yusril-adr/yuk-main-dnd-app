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

import BoardStoryDetailCopyDescriptionButton from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-copy-description-button";
import BoardStoryDetailSectionCard from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-section-card";
import { BOARD_STORY_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_messages";
import type { TBoardStoryDetailCardProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_types/board-story-detail-components-props";

export default function BoardStoryDetailQuestCard({
  story,
  className,
}: TBoardStoryDetailCardProps) {
  const { t } = useT(BOARD_STORY_DETAIL_MESSAGES);

  return (
    <BoardStoryDetailSectionCard
      icon={Scroll}
      title={t("quest.title")}
      className={className}
      action={
        story.description ? (
          <BoardStoryDetailCopyDescriptionButton
            description={story.description}
          />
        ) : undefined
      }
    >
      <If condition={!!story.description}>
        <Then>
          <RichTextContent
            value={story.description as string}
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
    </BoardStoryDetailSectionCard>
  );
}
