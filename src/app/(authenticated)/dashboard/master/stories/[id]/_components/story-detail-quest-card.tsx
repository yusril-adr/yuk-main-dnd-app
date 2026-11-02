"use client";

import { Scroll } from "lucide-react";
import { Else, If, Then } from "react-if";

import RichTextContent from "@/app/_components/rich-text-content";
import { useT } from "@/app/_hooks/use-t";

import StoryDetailCopyDescriptionButton from "./story-detail-copy-description-button";
import StoryDetailSectionCard from "./story-detail-section-card";
import type { TStoryDetailCardProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-card-props";
import { MASTER_STORY_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/[id]/_messages";

export default function StoryDetailQuestCard({
  story,
  className,
}: TStoryDetailCardProps) {
  const { t } = useT(MASTER_STORY_DETAIL_MESSAGES);

  return (
    <StoryDetailSectionCard
      icon={Scroll}
      title={t("quest.title")}
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
          <p className="italic text-muted-foreground">{t("quest.empty")}</p>
        </Else>
      </If>
    </StoryDetailSectionCard>
  );
}
