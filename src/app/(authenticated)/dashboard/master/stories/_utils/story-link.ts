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

// Optional link kept as the raw input string ("" = not set)
export const storyLocationLinkSchema = z
  .string()
  .trim()
  .max(
    STORY_LINK_MAX_LENGTH,
    `Location link must be at most ${STORY_LINK_MAX_LENGTH} characters`,
  )
  .refine(
    (value) => !value || !!parseHttpsUrl(value),
    "Location link must be an https link",
  );

export const storyDiscordChannelLinkSchema = z
  .string()
  .trim()
  .max(
    STORY_LINK_MAX_LENGTH,
    `Discord channel link must be at most ${STORY_LINK_MAX_LENGTH} characters`,
  )
  .refine((value) => {
    if (!value) return true;
    const url = parseHttpsUrl(value);
    return !!url && STORY_DISCORD_LINK_HOSTS.includes(url.hostname);
  }, "Discord channel link must be an https link on discord.com, discord.gg or discordapp.com");

export const storyFeedbackFormLinkSchema = z
  .string()
  .trim()
  .max(
    STORY_LINK_MAX_LENGTH,
    `Feedback form link must be at most ${STORY_LINK_MAX_LENGTH} characters`,
  )
  .refine(
    (value) => !value || !!parseHttpsUrl(value),
    "Feedback form link must be an https link",
  );
