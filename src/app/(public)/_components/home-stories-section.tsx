"use client";

import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { useT } from "@/app/_hooks/use-t";
import { HOME_MESSAGES } from "@/app/(public)/_messages";

import HomeBand from "@/app/(public)/_components/home-band";
import HomeSectionHeader from "@/app/(public)/_components/home-section-header";
import HomeStoryCard from "@/app/(public)/_components/home-story-card";
import HomeStoryCardSkeleton from "@/app/(public)/_components/home-story-card-skeleton";
import HomeEmptyState from "@/app/(public)/_components/home-empty-state";
import HomeErrorState from "@/app/(public)/_components/home-error-state";
import { useGetHomeStories } from "@/app/(public)/_hooks/use-get-home-stories";
import { HOME_STORY_LIMIT } from "@/app/(public)/_constants/home";

const GRID = "grid grid-cols-1 gap-6 md:grid-cols-3";

export default function HomeStoriesSection() {
  const { t } = useT(HOME_MESSAGES);
  const query = useGetHomeStories({
    page: 1,
    per_page: HOME_STORY_LIMIT,
    status: StoryStatusEnum.PUBLISHED,
  });
  const stories = (query.data?.data?.data?.items ?? []).slice(
    0,
    HOME_STORY_LIMIT,
  );

  let content: React.ReactNode;
  if (query.isPending) {
    content = (
      <div className={GRID} aria-busy>
        {Array.from({ length: HOME_STORY_LIMIT }, (_, i) => (
          <HomeStoryCardSkeleton key={i} />
        ))}
      </div>
    );
  } else if (query.isError) {
    content = (
      <HomeErrorState
        text={t("stories.error")}
        onRetry={() => query.refetch()}
      />
    );
  } else if (stories.length === 0) {
    content = <HomeEmptyState text={t("stories.empty")} />;
  } else {
    content = (
      <div className={GRID}>
        {stories.map((story) => (
          <HomeStoryCard key={story.id} story={story} />
        ))}
      </div>
    );
  }

  return (
    <HomeBand labelledBy="open-stories" muted>
      <HomeSectionHeader
        id="open-stories"
        title={t("stories.title")}
        description={t("stories.description")}
        linkHref="/stories"
        linkLabel={t("stories.seeAll")}
      />
      {content}
    </HomeBand>
  );
}
