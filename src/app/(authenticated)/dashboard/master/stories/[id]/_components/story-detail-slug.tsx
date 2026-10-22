import { ExternalLink } from "lucide-react";
import { If, Then, Else } from "react-if";

import type { TStoryDetailSlugProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-slug-props";

// Story slug; links to the public story page (new tab) when it is viewable there
export default function StoryDetailSlug({
  slug,
  isCanViewPublic,
}: TStoryDetailSlugProps) {
  return (
    <If condition={isCanViewPublic}>
      <Then>
        <a
          href={`/stories/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          title="View public page"
          className="inline-flex items-center gap-1 rounded-sm font-mono text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          /{slug}
          <ExternalLink aria-hidden className="size-3 shrink-0" />
          <span className="sr-only">View public page (opens in a new tab)</span>
        </a>
      </Then>
      <Else>
        <span className="font-mono text-xs text-muted-foreground">/{slug}</span>
      </Else>
    </If>
  );
}
