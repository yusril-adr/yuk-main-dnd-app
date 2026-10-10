import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { Skeleton } from "@/app/_components/ui/skeleton";

import StoryDetailMembersCardSkeleton from "./story-detail-members-card-skeleton";

function SectionCardSkeleton({ rows }: { rows: number }) {
  return (
    <Card className="border-2 border-primary/15">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-5 w-32" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Skeleton className="h-px w-full" />
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} className="flex gap-3">
            <Skeleton className="size-5 shrink-0 rounded" />
            <div className="flex flex-1 flex-col gap-1.5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// Same structure as the loaded page: hero (image + title block), then the 2 + 1 card grid, then the party card
export default function StoryDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="gap-0 overflow-hidden py-0">
        <Skeleton className="h-48 w-full rounded-none sm:h-64" />
        <div className="flex flex-col gap-3 border-t p-6">
          <Skeleton className="h-8 w-2/3" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-20 rounded-md" />
            <Skeleton className="h-5 w-20 rounded-md" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="border-2 border-primary/15 lg:col-span-2 lg:self-start">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-5 w-36" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Skeleton className="h-px w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
        <div className="flex flex-col gap-6">
          <SectionCardSkeleton rows={5} />
          <SectionCardSkeleton rows={3} />
        </div>
      </div>
      <StoryDetailMembersCardSkeleton />
    </div>
  );
}
