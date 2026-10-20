import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

// Every route lives under app/[locale], so the locale always comes from the
// segment (public: URL prefix, signed-in: rewritten from the cookie by the proxy)
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    // Built from the colocated _messages folders by scripts/generate-messages.mjs
    messages: (await import(`../generated/messages/${locale}.json`)).default,
  };
});
