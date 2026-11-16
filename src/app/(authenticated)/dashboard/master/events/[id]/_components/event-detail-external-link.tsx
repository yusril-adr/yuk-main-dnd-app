"use client";

import { ExternalLink } from "lucide-react";

import { useT } from "@/app/_hooks/use-t";
import type { TEventDetailExternalLinkProps } from "@/app/(authenticated)/dashboard/master/events/[id]/_types/event-detail-external-link-props";
import { MASTER_EVENT_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/[id]/_messages";

// External event link (map, feedback); opens in a new tab
export default function EventDetailExternalLink({
  href,
  children,
}: TEventDetailExternalLinkProps) {
  const { t } = useT(MASTER_EVENT_DETAIL_MESSAGES);

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
