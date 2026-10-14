import { Scroll } from "lucide-react";
import { Else, If, Then } from "react-if";

import RichTextContent from "@/app/_components/rich-text-content";

import BoardStoryDetailCopyDescriptionButton from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-copy-description-button";
import BoardStoryDetailSectionCard from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-section-card";
import type { TBoardStoryDetailCardProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_types/board-story-detail-components-props";

export default function BoardStoryDetailQuestCard({
  story,
  className,
}: TBoardStoryDetailCardProps) {
  return (
    <BoardStoryDetailSectionCard
      icon={Scroll}
      title="Quest Details"
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
          <p className="italic text-muted-foreground">
            No description has been written for this quest yet.
          </p>
        </Else>
      </If>
    </BoardStoryDetailSectionCard>
  );
}
