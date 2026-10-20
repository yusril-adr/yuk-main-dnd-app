import type { Metadata } from "next";

import { getPublicStoryByIdentifierOnServer } from "@/api/main/modules/stories/server";
import { getRichTextPlainText } from "@/utils/rich-text";
import { makePageMetadata, toMetaDescription } from "@/utils/seo-helper";

import PublicStoryDetailPageClient from "./page-client";

const FALLBACK_DESCRIPTION =
  "Story details, party and Dungeon Master on YukMainDnD.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const identifier = decodeURIComponent(slug);
  const story = await getPublicStoryByIdentifierOnServer(identifier);

  // API down or story not public: generic quest metadata on the requested URL
  if (!story) {
    return makePageMetadata({
      title: "Story",
      description: FALLBACK_DESCRIPTION,
      path: `/stories/${encodeURIComponent(identifier)}`,
    });
  }

  return makePageMetadata({
    title: story.title,
    description: toMetaDescription(
      getRichTextPlainText(story.description),
      FALLBACK_DESCRIPTION,
    ),
    // Canonical on the slug, matching the public story links
    path: `/stories/${encodeURIComponent(story.slug || story.id)}`,
    image: story.banner_url
      ? { url: story.banner_url, alt: `${story.title} banner` }
      : null,
  });
}

export default function PublicStoryDetailPage() {
  return <PublicStoryDetailPageClient />;
}
