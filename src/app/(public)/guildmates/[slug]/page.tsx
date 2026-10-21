import type { Metadata } from "next";

import { getPublicUserByIdentifierOnServer } from "@/api/main/modules/users/server";
import { getGuildmateHref } from "@/utils/user-helper";
import { formatExp } from "@/app/(public)/guildmates/_utils/public-guildmate-helper";
import { getRichTextPlainText } from "@/utils/rich-text";
import { makePageMetadata, toMetaDescription } from "@/utils/seo-helper";

import PublicGuildmateDetailPageClient from "./page-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Slug is the username (or the id for guildmates without one)
  const identifier = decodeURIComponent(slug);
  const user = await getPublicUserByIdentifierOnServer(identifier);

  if (!user) {
    return makePageMetadata({
      title: `Adventurer ${identifier}`,
      description: `Adventurer card of ${identifier}: DM and player EXP and quest log in the YukMainDnD guild.`,
      path: getGuildmateHref({ id: identifier }),
    });
  }

  const fallback = `${user.display_name}: ${formatExp(user.player_exp)} player EXP and ${formatExp(user.dm_exp)} DM EXP in the YukMainDnD guild. See their adventurer card and quest log.`;

  return makePageMetadata({
    title: `Adventurer ${user.display_name}`,
    description: toMetaDescription(getRichTextPlainText(user.bio), fallback),
    path: getGuildmateHref(user),
    image: user.avatar_url
      ? { url: user.avatar_url, alt: `${user.display_name} avatar` }
      : null,
  });
}

export default function PublicGuildmateDetailPage() {
  return <PublicGuildmateDetailPageClient />;
}
