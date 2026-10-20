import { Scroll } from "lucide-react";
import { Else, If, Then } from "react-if";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
} from "@/app/_components/ui/empty";
import RichTextContent from "@/app/_components/rich-text-content";

import BoardStoryDetailCopyDescriptionButton from "@/app/[locale]/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-copy-description-button";
import BoardStoryDetailSectionCard from "@/app/[locale]/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-section-card";
import type { TBoardStoryDetailCardProps } from "@/app/[locale]/(authenticated)/dashboard/(player-board)/stories/[id]/_types/board-story-detail-components-props";

export default function BoardStoryDetailQuestCard({
  story,
  className,
}: TBoardStoryDetailCardProps) {
  return (
    <BoardStoryDetailSectionCard
      icon={Scroll}
      title="Story Details"
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
                No description has been written for this story yet.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </Else>
      </If>
    </BoardStoryDetailSectionCard>
  );
}
