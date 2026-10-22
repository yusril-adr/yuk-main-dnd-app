import { ExternalLink } from "lucide-react";

import type { TStoryDetailExternalLinkProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-external-link-props";

// External story link (map, Discord); opens in a new tab
export default function StoryDetailExternalLink({
  href,
  children,
}: TStoryDetailExternalLinkProps) {
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
