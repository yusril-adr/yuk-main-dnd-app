"use client";

import { ExternalLink } from "lucide-react";

import { useT } from "@/app/_hooks/use-t";
import type { TStoryDetailExternalLinkProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-external-link-props";
import { MASTER_STORY_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/[id]/_messages";

// External story link (map, Discord); opens in a new tab
export default function StoryDetailExternalLink({
  href,
  children,
}: TStoryDetailExternalLinkProps) {
  const { t } = useT(MASTER_STORY_DETAIL_MESSAGES);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-medium text-primary underline underline-offset-4 hover:text-primary/80"
    >
      {children}
      <ExternalLink aria-hidden className="size-3.5 shrink-0" />
      <span className="sr-only">{t("external.opensInNewTab")}</span>
    </a>
  );
}
