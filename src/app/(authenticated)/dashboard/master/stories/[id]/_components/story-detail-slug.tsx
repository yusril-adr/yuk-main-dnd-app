"use client";

import { ExternalLink } from "lucide-react";
import { If, Then, Else } from "react-if";

import { useT } from "@/app/_hooks/use-t";
import type { TStoryDetailSlugProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-slug-props";
import { MASTER_STORY_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/[id]/_messages";

// Story slug; links to the public story page (new tab) when it is viewable there
export default function StoryDetailSlug({
  slug,
  isCanViewPublic,
}: TStoryDetailSlugProps) {
  const { t } = useT(MASTER_STORY_DETAIL_MESSAGES);

  return (
    <If condition={isCanViewPublic}>
      <Then>
        <a
          href={`/stories/${slug}`}
          target="_blank"
          title={t("slug.viewPublic")}
          className="inline-flex items-center gap-1 rounded-sm font-mono text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          /{slug}
          <ExternalLink aria-hidden className="size-3 shrink-0" />
          <span className="sr-only">{t("slug.viewPublicSr")}</span>
        </a>
      </Then>
      <Else>
        <span className="font-mono text-xs text-muted-foreground">/{slug}</span>
      </Else>
    </If>
  );
}
