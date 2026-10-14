import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
import { Skeleton } from "@/app/_components/ui/skeleton";

export default function PublicGuildmateCardSkeleton() {
  return (
    <Card className="h-full gap-3 rounded-md py-4 shadow-none">
      <CardContent className="flex items-center gap-3 px-4">
        <Skeleton className="size-12 rounded-full" />
        <div className="flex flex-1 flex-col gap-1.5">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </CardContent>
      <div className="flex gap-1.5 px-4">
        <Skeleton className="h-5 w-16 rounded-sm" />
      </div>
      <CardFooter className="mt-auto flex-col items-stretch gap-2 px-4 pt-0">
        <Skeleton className="h-3.5 w-40" />
        <Skeleton className="h-3.5 w-44" />
      </CardFooter>
    </Card>
  );
}
