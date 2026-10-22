import { ExternalLink } from "lucide-react";

import type { TBoardStoryDetailExternalLinkProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_types/board-story-detail-components-props";

// External story link (map, Discord); opens in a new tab
export default function BoardStoryDetailExternalLink({
  href,
  children,
}: TBoardStoryDetailExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-medium text-primary underline underline-offset-4 hover:text-primary/80"
    >
      {children}
      <ExternalLink aria-hidden className="size-3.5 shrink-0" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
