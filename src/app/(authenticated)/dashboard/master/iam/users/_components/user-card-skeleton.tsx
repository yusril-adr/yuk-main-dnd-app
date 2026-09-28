import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/_components/ui/card";
import { Skeleton } from "@/app/_components/ui/skeleton";

export default function UserCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="min-w-0 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
          <Skeleton className="size-8 rounded" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
          <div className="space-y-1">
            <Skeleton className="h-3 w-10 mx-auto" />
            <Skeleton className="h-4 w-8 mx-auto" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-3 w-8 mx-auto" />
            <Skeleton className="h-4 w-8 mx-auto" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-3 w-12 mx-auto" />
            <Skeleton className="h-4 w-8 mx-auto" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-3">
        <div className="flex flex-wrap gap-1.5">
          <Skeleton className="h-5 w-14 rounded-md" />
          <Skeleton className="h-5 w-16 rounded-md" />
        </div>
      </CardFooter>
    </Card>
  );
}