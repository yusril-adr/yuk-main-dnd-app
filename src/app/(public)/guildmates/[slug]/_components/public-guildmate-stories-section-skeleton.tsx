import { Skeleton } from "@/app/_components/ui/skeleton";
import PublicGuildmateStoryCardSkeleton from "@/app/(public)/guildmates/[slug]/_components/public-guildmate-story-card-skeleton";
import { PUBLIC_GUILDMATE_STORY_PAGE_SIZE } from "@/app/(public)/guildmates/[slug]/_constants/public-guildmate-detail";

// Keeps the loading page about as tall as the loaded one
export default function PublicGuildmateStoriesSectionSkeleton() {
  return (
    <section className="flex w-full flex-col gap-4 print:hidden">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Skeleton className="h-7 w-36 sm:h-8" />
        <Skeleton className="h-8 w-56 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {Array.from({ length: PUBLIC_GUILDMATE_STORY_PAGE_SIZE }).map(
          (_, idx) => (
            <PublicGuildmateStoryCardSkeleton key={`skeleton-${idx}`} />
          ),
        )}
      </div>
    </section>
  );
}
