import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/_components/ui/card";
import { Skeleton } from "@/app/_components/ui/skeleton";

export default function StoryCardSkeleton() {
  return (
    <Card className="pt-0">
      <Skeleton className="aspect-video w-full rounded-none" />

      <CardHeader>
        <div className="flex justify-between gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="size-8 rounded" />
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>

      <CardFooter className="border-t pt-3">
        <div className="flex flex-wrap gap-1.5">
          <Skeleton className="h-5 w-16 rounded-md" />
          <Skeleton className="h-5 w-16 rounded-md" />
        </div>
      </CardFooter>
    </Card>
  );
}
