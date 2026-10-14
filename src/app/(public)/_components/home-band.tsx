import { cn } from "@/utils/cn";

import type { THomeBandProps } from "@/app/(public)/_types/home-components-props";

// Full-bleed band; content stays within max-w-7xl
export default function HomeBand({
  id,
  labelledBy,
  muted,
  className,
  children,
}: THomeBandProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("w-full", muted && "border-y bg-muted/50", className)}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
        {children}
      </div>
    </section>
  );
}
