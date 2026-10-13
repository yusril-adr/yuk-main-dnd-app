import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
import { Skeleton } from "@/app/_components/ui/skeleton";

export default function PublicStoryCardSkeleton() {
  return (
    <Card className="h-full gap-3 pt-0 sm:gap-4">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <CardContent className="flex flex-col gap-3 sm:gap-4">
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-20 rounded-sm" />
          <Skeleton className="h-5 w-16 rounded-sm" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex-col items-stretch gap-3 border-t">
        <div className="flex justify-between">
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-3.5 w-10" />
        </div>
        <Skeleton className="h-3.5 w-36" />
        <div className="flex items-center gap-2">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-3.5 w-32" />
        </div>
      </CardFooter>
    </Card>
  );
}
