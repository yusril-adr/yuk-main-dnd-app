import type { Metadata } from "next";

import PublicGuildmateDetailPageClient from "./page-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Slug is the username (or the id for guildmates without one)
  return {
    title: `YukMainDnD - Adventurer ${decodeURIComponent(slug)}`,
  };
}

export default function PublicGuildmateDetailPage() {
  return <PublicGuildmateDetailPageClient />;
}
