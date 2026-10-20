import type { Messages } from "next-intl";

import en from "@/generated/messages/en.json";
import id from "@/generated/messages/id.json";
import { routing, type TAppLocale } from "./routing";

// Messages for code that runs outside a request locale: static metadata
// exports (opengraph-image alt) and the root 404. Server only.
const MESSAGES: Record<TAppLocale, Messages> = { en, id };

export const DEFAULT_MESSAGES = MESSAGES[routing.defaultLocale];
