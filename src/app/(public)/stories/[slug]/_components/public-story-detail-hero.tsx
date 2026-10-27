import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { If, Then } from "react-if";

import PublicStoryBanner from "@/app/(public)/stories/_components/public-story-banner";
import PublicStoryStatusBadge from "@/app/(public)/stories/_components/public-story-status-badge";
import PublicStoryTypeBadge from "@/app/(public)/stories/_components/public-story-type-badge";
import PublicStoryLocationBadge from "@/app/(public)/stories/_components/public-story-location-badge";
import type { TPublicStoryDetailProps } from "@/app/(public)/stories/[slug]/_types/public-story-detail-props";

// Full-bleed banner with the title laid over a gradient
export default function PublicStoryDetailHero({
  story,
}: TPublicStoryDetailProps) {
  return (
    <section className="relative isolate h-[22rem] w-full overflow-hidden sm:h-[28rem] lg:h-[32rem]">
      <PublicStoryBanner
        bannerUrl={story.banner_url}
        title={story.title}
        className="absolute inset-0 -z-20"
        priority
        iconClassName="size-24"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/60 to-black/20" />

      <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-between px-4 pt-6 pb-10 sm:px-10">
        <Link
          href="/stories"
          className="flex w-fit items-center gap-2 rounded-full bg-background/70 px-4 py-2 text-sm font-medium backdrop-blur-md transition-colors hover:bg-background [&>svg]:size-4"
        >
          <ArrowLeft />
          All stories
        </Link>

        <div className="flex max-w-4xl flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <PublicStoryStatusBadge status={story.status} />
            <PublicStoryTypeBadge type={story.type} />
            <PublicStoryLocationBadge
              locationType={story.location_type}
              className="bg-background/70 backdrop-blur-md"
            />
          </div>
          <If condition={!!story.game_system}>
            <Then>
              <span className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
                {story.game_system}
              </span>
            </Then>
          </If>
          <h1 className="font-heading text-4xl leading-tight break-words sm:text-5xl lg:text-6xl">
            {story.title}
          </h1>
        </div>
      </div>
    </section>
  );
}
