import { Skeleton } from "@/app/_components/ui/skeleton";

export default function PublicStoryDetailSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="relative h-[22rem] w-full sm:h-[28rem] lg:h-[32rem]">
        <Skeleton className="absolute inset-0 rounded-none" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end gap-4 px-4 pb-10 sm:px-10">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-28 rounded-full bg-background/60" />
            <Skeleton className="h-6 w-20 rounded-full bg-background/60" />
          </div>
          <Skeleton className="h-12 w-2/3 bg-background/60" />
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-10 lg:grid-cols-3 lg:px-10">
        <div className="flex flex-col gap-6 sm:gap-8 lg:col-span-2">
          {[5, 3].map((rows, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-4 rounded-md border p-5 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-xl" />
                <Skeleton className="h-6 w-40" />
              </div>
              {Array.from({ length: rows }).map((_, row) => (
                <Skeleton key={row} className="h-4 w-full last:w-2/3" />
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 rounded-md border p-5 sm:p-6 lg:order-last">
          <Skeleton className="h-6 w-32 rounded-full" />
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex gap-3">
              <Skeleton className="size-9 rounded-lg" />
              <div className="flex flex-1 flex-col gap-1.5">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
