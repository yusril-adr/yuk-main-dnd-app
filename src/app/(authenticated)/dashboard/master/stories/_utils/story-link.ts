import * as z from "zod";

import {
  STORY_DISCORD_LINK_HOSTS,
  STORY_LINK_MAX_LENGTH,
} from "@/app/(authenticated)/dashboard/master/stories/_constants/story-link";

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

type TStoryLinkMessages = {
  maxLength: string;
  httpsRequired: string;
};

// Optional link kept as the raw input string ("" = not set)
export function createStoryLocationLinkSchema(messages: TStoryLinkMessages) {
  return z
    .string()
    .trim()
    .max(STORY_LINK_MAX_LENGTH, messages.maxLength)
    .refine((value) => !value || !!parseHttpsUrl(value), messages.httpsRequired);
}

export function createStoryDiscordChannelLinkSchema(
  messages: TStoryLinkMessages,
) {
  return z
    .string()
    .trim()
    .max(STORY_LINK_MAX_LENGTH, messages.maxLength)
    .refine((value) => {
      if (!value) return true;
      const url = parseHttpsUrl(value);
      return !!url && STORY_DISCORD_LINK_HOSTS.includes(url.hostname);
    }, messages.httpsRequired);
}

export function createStoryFeedbackFormLinkSchema(
  messages: TStoryLinkMessages,
) {
  return z
    .string()
    .trim()
    .max(STORY_LINK_MAX_LENGTH, messages.maxLength)
    .refine((value) => !value || !!parseHttpsUrl(value), messages.httpsRequired);
}
