import * as z from "zod";

import { EVENT_LINK_MAX_LENGTH } from "@/app/(authenticated)/dashboard/master/events/_constants/event-link";

// Parsed https URL with a dotted host (like the API's IsUrl), else null
function parseHttpsUrl(value: string): URL | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.includes(".")
      ? url
      : null;
  } catch {
    return null;
  }
}

type TEventLinkMessages = {
  maxLength: string;
  httpsRequired: string;
};

// Optional link kept as the raw input string ("" = not set)
export function createEventLocationLinkSchema(messages: TEventLinkMessages) {
  return z
    .string()
    .trim()
    .max(EVENT_LINK_MAX_LENGTH, messages.maxLength)
    .refine((value) => !value || !!parseHttpsUrl(value), messages.httpsRequired);
}

export function createEventFeedbackFormLinkSchema(
  messages: TEventLinkMessages,
) {
  return z
    .string()
    .trim()
    .max(EVENT_LINK_MAX_LENGTH, messages.maxLength)
    .refine((value) => !value || !!parseHttpsUrl(value), messages.httpsRequired);
}
