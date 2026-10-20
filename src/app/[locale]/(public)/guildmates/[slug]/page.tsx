import type { Metadata } from "next";
import { NextIntlClientProvider, type Locale } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { getPublicUserByIdentifierOnServer } from "@/api/main/modules/users/server";
import { getGuildmateHref } from "@/utils/user-helper";
import { formatExp } from "@/app/[locale]/(public)/guildmates/_utils/public-guildmate-helper";
import { getRichTextPlainText } from "@/utils/rich-text";
import { makePageMetadata, toMetaDescription } from "@/utils/seo-helper";
import { pickMessages } from "@/i18n/pick-messages";

import PublicGuildmateDetailPageClient from "./page-client";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/guildmates/[slug]">): Promise<Metadata> {
  const { slug, locale: requested } = await params;
  const locale = requested as Locale;
  const t = await getTranslations({
    locale,
    namespace: "guildmateDetail.meta",
  });
  const tSite = await getTranslations({ locale, namespace: "common.site" });
  // Slug is the username (or the id for guildmates without one)
  const identifier = decodeURIComponent(slug);
  const user = await getPublicUserByIdentifierOnServer(identifier);

  if (!user) {
    return makePageMetadata({
      title: t("title", { name: identifier }),
      description: t("unknownDescription", { name: identifier }),
      path: getGuildmateHref({ id: identifier }),
      locale,
      localized: true,
      defaultImageAlt: tSite("ogAlt"),
    });
  }

  const fallback = t("description", {
    name: user.display_name,
    playerXp: formatExp(user.player_exp, locale),
    dmXp: formatExp(user.dm_exp, locale),
  });

  return makePageMetadata({
    title: t("title", { name: user.display_name }),
    description: toMetaDescription(getRichTextPlainText(user.bio), fallback),
    path: getGuildmateHref(user),
    image: user.avatar_url
      ? {
          url: user.avatar_url,
          alt: t("avatarAlt", { name: user.display_name }),
        }
      : null,
    locale,
    localized: true,
    defaultImageAlt: tSite("ogAlt"),
  });
}

export default async function PublicGuildmateDetailPage({
  params,
}: PageProps<"/[locale]/guildmates/[slug]">) {
  setRequestLocale((await params).locale as Locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider
      messages={pickMessages(messages, [
        "guildmateDetail",
        "guildmates",
        "common",
      ])}
    >
      <PublicGuildmateDetailPageClient />
    </NextIntlClientProvider>
  );
}
