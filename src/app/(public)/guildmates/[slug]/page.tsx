import type { Metadata } from "next";

import { makePageMetadata } from "@/utils/seo-helper";

import PublicGuildmateDetailPageClient from "./page-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Slug is the username (or the id for guildmates without one)
  const name = decodeURIComponent(slug);
  return makePageMetadata({
    title: `Adventurer ${name}`,
    description: `Adventurer card of ${name}: levels, EXP and quest log in the YukMainDnD guild.`,
    path: `/guildmates/${slug}`,
  });
}

export default function PublicGuildmateDetailPage() {
  return <PublicGuildmateDetailPageClient />;
}
