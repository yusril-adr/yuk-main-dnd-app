import { ExternalLink } from "lucide-react";

import type { TPublicEventDetailExternalLinkProps } from "@/app/(public)/events/[slug]/_types/public-event-detail-external-link-props";

// External event link (map or feedback form); opens in a new tab
export default function PublicEventDetailExternalLink({
  href,
  children,
}: TPublicEventDetailExternalLinkProps) {
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
