import { AspectRatio } from "@/app/_components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/_components/ui/card";
import { Skeleton } from "@/app/_components/ui/skeleton";

export default function HomeStoryCardSkeleton() {
  return (
    <Card size="sm" className="gap-3 pt-0">
      <AspectRatio ratio={16 / 10} className="border-b">
        <Skeleton className="absolute inset-0 rounded-none" />
      </AspectRatio>
      <CardHeader>
        <Skeleton className="h-5 w-3/4" />
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
      <CardFooter className="justify-between border-t">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </CardFooter>
    </Card>
  );
}
