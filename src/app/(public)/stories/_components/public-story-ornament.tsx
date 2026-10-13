import { cn } from "@/utils/cn";

import type { TPublicStoryOrnamentProps } from "@/app/(public)/stories/_types/public-story-components-props";

// Thin rule with a small diamond flourish; tiny inline SVG, no images
export default function PublicStoryOrnament({
  className,
}: TPublicStoryOrnamentProps) {
  return (
    <div
      aria-hidden
      className={cn("flex items-center gap-2 text-primary/50", className)}
    >
      <span className="h-px flex-1 bg-border" />
      <svg viewBox="0 0 24 8" className="h-2 w-6 fill-current">
        <path d="M0 4h7l5-4 5 4h7-7l-5 4-5-4z" />
      </svg>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
