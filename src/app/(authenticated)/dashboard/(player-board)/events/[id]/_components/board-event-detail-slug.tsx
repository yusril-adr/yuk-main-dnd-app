"use client";

import { ExternalLink } from "lucide-react";
import { If, Then, Else } from "react-if";

import { useT } from "@/app/_hooks/use-t";

import { BOARD_EVENT_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_messages";
import type { TBoardEventDetailSlugProps } from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_types/board-event-detail-components-props";

// Event slug; links to the public event page (new tab) when it is viewable there
export default function BoardEventDetailSlug({
  slug,
  isCanViewPublic,
}: TBoardEventDetailSlugProps) {
  const { t } = useT(BOARD_EVENT_DETAIL_MESSAGES);

  return (
    <If condition={isCanViewPublic}>
      <Then>
        <a
          href={`/events/${slug}`}
          target="_blank"
          title={t("slug.viewPublic")}
          className="inline-flex items-center gap-1 rounded-sm font-mono text-xs underline-offset-4 hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          /{slug}
          <ExternalLink aria-hidden className="size-3 shrink-0" />
          <span className="sr-only">{t("slug.viewPublicSr")}</span>
        </a>
      </Then>
      <Else>
        <span className="font-mono text-xs">/{slug}</span>
      </Else>
    </If>
  );
}
