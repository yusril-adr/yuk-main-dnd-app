import { Card } from "@/app/_components/ui/card";
import { Skeleton } from "@/app/_components/ui/skeleton";

export default function PublicGuildmateAdventurerCardSkeleton() {
  return (
    <Card className="@container aspect-[5/7] w-full max-w-[380px] gap-0 rounded-lg border-4 border-double border-primary/30 p-1.5 py-1.5 shadow-none ring-0">
      <div className="flex h-full flex-col items-center gap-[3cqw] rounded-sm border border-primary/20 px-[4cqw] py-[3.5cqw]">
        <Skeleton className="h-[3cqw] w-full" />
        <Skeleton className="size-[43cqw] rounded-md" />
        <Skeleton className="h-[7cqw] w-2/3" />
        <Skeleton className="h-[3.6cqw] w-1/3" />
        <Skeleton className="h-[5cqw] w-1/2" />
        <div className="mt-[2cqw] flex w-full flex-col gap-[4cqw]">
          <Skeleton className="h-[7cqw] w-full" />
          <Skeleton className="h-[7cqw] w-full" />
        </div>
        <Skeleton className="mt-auto h-[3cqw] w-1/2" />
      </div>
    </Card>
  );
}
