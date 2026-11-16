import type { Metadata } from "next";

import { getPublicEventByIdentifierOnServer } from "@/api/main/modules/events/server";
import { getRichTextPlainText } from "@/utils/rich-text";
import { makePageMetadata, toMetaDescription } from "@/utils/seo-helper";

import PublicEventDetailPageClient from "./page-client";

const FALLBACK_DESCRIPTION =
  "Event details, party and host on YukMainDnD.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const identifier = decodeURIComponent(slug);
  const event = await getPublicEventByIdentifierOnServer(identifier);

  // API down or event not public: generic quest metadata on the requested URL
  if (!event) {
    return makePageMetadata({
      title: "Event",
      description: FALLBACK_DESCRIPTION,
      path: `/events/${encodeURIComponent(identifier)}`,
    });
  }

  return makePageMetadata({
    title: event.title,
    description: toMetaDescription(
      getRichTextPlainText(event.description),
      FALLBACK_DESCRIPTION,
    ),
    // Canonical on the slug, matching the public event links
    path: `/events/${encodeURIComponent(event.slug || event.id)}`,
    image: event.banner_url
      ? { url: event.banner_url, alt: `${event.title} banner` }
      : null,
  });
}

export default function PublicEventDetailPage() {
  return <PublicEventDetailPageClient />;
}
