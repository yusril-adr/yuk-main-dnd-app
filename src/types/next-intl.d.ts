import type { routing } from "@/i18n/routing";
import type messages from "@/generated/messages/en.json";

// Typed locales and message keys; en.json is generated from the colocated
// _messages folders (run `node scripts/generate-messages.mjs`)
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
