import { cn } from "@/utils/cn";

import type { TPublicStoryDetailSectionProps } from "@/app/(public)/stories/_types/public-story-components-props";

export default function PublicStoryDetailSection({
  icon: Icon,
  title,
  className,
  children,
}: TPublicStoryDetailSectionProps) {
  return (
    <section
      className={cn(
        "flex flex-col gap-4 rounded-md border bg-card p-5 sm:gap-5 sm:p-6 lg:p-8",
        className,
      )}
    >
      <header className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center sm:size-10 justify-center rounded-sm border border-primary/30 bg-primary/10 text-primary [&>svg]:size-5">
          <Icon />
        </span>
        <h2 className="font-heading text-xl sm:text-2xl">{title}</h2>
      </header>
      {children}
    </section>
  );
}
