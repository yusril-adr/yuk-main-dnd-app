import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { Skeleton } from "@/app/_components/ui/skeleton";

import { EVENT_MEMBER_PREVIEW_COUNT } from "@/app/(authenticated)/dashboard/master/events/_constants/event-member-preview";

export default function EventDetailMembersCardSkeleton() {
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
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: EVENT_MEMBER_PREVIEW_COUNT }).map(
            (_, idx) => (
              <Skeleton key={idx} className="size-7 rounded-full" />
            ),
          )}
        </div>
      </CardContent>
    </Card>
  );
}
