import type { Metadata } from "next";
import { NextIntlClientProvider, type Locale } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { getPublicStoryByIdentifierOnServer } from "@/api/main/modules/stories/server";
import { getRichTextPlainText } from "@/utils/rich-text";
import { makePageMetadata, toMetaDescription } from "@/utils/seo-helper";
import { pickMessages } from "@/i18n/pick-messages";

import PublicStoryDetailPageClient from "./page-client";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/stories/[slug]">): Promise<Metadata> {
  const { slug, locale: requested } = await params;
  const locale = requested as Locale;
  const t = await getTranslations({ locale, namespace: "storyDetail.meta" });
  const tSite = await getTranslations({ locale, namespace: "common.site" });
  const identifier = decodeURIComponent(slug);
  const story = await getPublicStoryByIdentifierOnServer(identifier);

  // API down or story not public: generic story metadata on the requested URL
  if (!story) {
    return makePageMetadata({
      title: t("title"),
      description: t("description"),
      path: `/stories/${encodeURIComponent(identifier)}`,
      locale,
      localized: true,
      defaultImageAlt: tSite("ogAlt"),
    });
  }

  return makePageMetadata({
    title: story.title,
    description: toMetaDescription(
      getRichTextPlainText(story.description),
      t("description"),
    ),
    // Canonical on the slug, matching the public story links
    path: `/stories/${encodeURIComponent(story.slug || story.id)}`,
    image: story.banner_url
      ? { url: story.banner_url, alt: t("bannerAlt", { title: story.title }) }
      : null,
    locale,
    localized: true,
    defaultImageAlt: tSite("ogAlt"),
  });
}

export default async function PublicStoryDetailPage({
  params,
}: PageProps<"/[locale]/stories/[slug]">) {
  setRequestLocale((await params).locale as Locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider
      messages={pickMessages(messages, ["storyDetail", "stories", "common"])}
    >
      <PublicStoryDetailPageClient />
    </NextIntlClientProvider>
  );
}
