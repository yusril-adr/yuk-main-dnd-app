import { Skeleton } from "@/app/_components/ui/skeleton";

export default function PublicGuildmateLegendSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-2 sm:hidden">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Skeleton key={idx} className="h-16 w-full rounded-md" />
        ))}
      </div>
      <div className="hidden grid-cols-3 items-end gap-2 sm:grid lg:gap-3">
        {[2, 1, 3].map((rank) => (
          <div key={rank} className="flex flex-col items-center gap-2">
            <Skeleton
              className={
                rank === 1
                  ? "size-16 rounded-full lg:size-20"
                  : "size-12 rounded-full lg:size-14"
              }
            />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton
              className={`w-full rounded-b-none ${rank === 1 ? "h-24" : rank === 2 ? "h-20" : "h-16"}`}
            />
          </div>
        ))}
      </div>
    </>
  );
}
