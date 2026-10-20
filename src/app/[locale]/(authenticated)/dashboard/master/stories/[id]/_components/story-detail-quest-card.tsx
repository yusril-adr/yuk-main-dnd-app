import { Scroll } from "lucide-react";
import { Else, If, Then } from "react-if";

import RichTextContent from "@/app/_components/rich-text-content";

import StoryDetailCopyDescriptionButton from "./story-detail-copy-description-button";
import StoryDetailSectionCard from "./story-detail-section-card";
import type { TStoryDetailCardProps } from "@/app/[locale]/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-card-props";

export default function StoryDetailQuestCard({
  story,
  className,
}: TStoryDetailCardProps) {
  return (
    <StoryDetailSectionCard
      icon={Scroll}
      title="Story Details"
      className={className}
      action={
        story.description ? (
          <StoryDetailCopyDescriptionButton description={story.description} />
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
            No description has been written for this story yet.
          </p>
        </Else>
      </If>
    </StoryDetailSectionCard>
  );
}
