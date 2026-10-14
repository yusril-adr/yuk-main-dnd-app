"use client";

import HomeSectionHeader from "@/app/(public)/_components/home-section-header";
import HomeStoryCard from "@/app/(public)/_components/home-story-card";
import HomeStoryCardSkeleton from "@/app/(public)/_components/home-story-card-skeleton";
import HomeEmptyState from "@/app/(public)/_components/home-empty-state";
import HomeErrorState from "@/app/(public)/_components/home-error-state";
import { useGetHomeStories } from "@/app/(public)/_hooks/use-get-home-stories";
import { HOME_STORY_LIMIT } from "@/app/(public)/_constants/home";
import type { THomeStoriesSectionProps } from "@/app/(public)/_types/home-components-props";

const GRID = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4";

export default function HomeStoriesSection({
  id,
  status,
  title,
  description,
  emptyText,
}: THomeStoriesSectionProps) {
  const query = useGetHomeStories({
    page: 1,
    per_page: HOME_STORY_LIMIT,
    status,
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
        text="The quest board could not be read."
        onRetry={() => query.refetch()}
      />
    );
  } else if (stories.length === 0) {
    content = <HomeEmptyState text={emptyText} />;
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
    <section aria-labelledby={id} className="flex flex-col gap-4">
      <HomeSectionHeader
        id={id}
        title={title}
        description={description}
        linkHref="/stories"
        linkLabel="See all quests"
      />
      {content}
    </section>
  );
}
