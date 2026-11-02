import * as z from "zod";

import { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";
import { countRichTextCharacters } from "@/utils/rich-text";
import { STORY_DESCRIPTION_MAX_LENGTH } from "@/app/(authenticated)/dashboard/master/stories/_constants/story-description";
import { STORY_REWARD_MAX } from "@/app/(authenticated)/dashboard/master/stories/_constants/story-reward";
import { STORY_LINK_MAX_LENGTH } from "@/app/(authenticated)/dashboard/master/stories/_constants/story-link";
import {
  createStoryDiscordChannelLinkSchema,
  createStoryLocationLinkSchema,
  createStoryFeedbackFormLinkSchema,
} from "@/app/(authenticated)/dashboard/master/stories/_utils/story-link";
import type { TStoryCreateTranslate } from "@/app/(authenticated)/dashboard/master/stories/create/_types/story-create-translate";

// Kept as the raw input string ("" = 0); whole number between 0 and the DB max
function storyRewardSchema(
  t: TStoryCreateTranslate,
  label: string,
  locale: string,
) {
  return z
    .string()
    .regex(/^\d*$/, t("validation.rewardWhole", { label }))
    .refine(
      (value) => !value || Number(value) <= STORY_REWARD_MAX,
      t("validation.rewardMax", {
        label,
        max: STORY_REWARD_MAX.toLocaleString(locale),
      }),
    );
}

export function createStoryCreateFormSchema(
  t: TStoryCreateTranslate,
  locale: string = "en-US",
) {
  return z.object({
    // Uploaded banner file id ("" = no banner)
    bannerFileId: z.string(),
    title: z
      .string(t("validation.titleRequired"))
      .min(1, t("validation.titleRequired"))
      .max(150, t("validation.titleMax", { max: 150 }))
      .regex(/\S/, t("validation.titleNotEmpty")),
    // Markdown ("" = empty). Counted like the editor: visible text (no
    // Markdown syntax), line breaks 1, nothing between paragraphs
    description: z
      .string()
      .refine(
        (value) =>
          countRichTextCharacters(value) <= STORY_DESCRIPTION_MAX_LENGTH,
        t("validation.descriptionMax", { max: STORY_DESCRIPTION_MAX_LENGTH }),
      )
      .optional(),
    type: z.nativeEnum(StoryTypeEnum, t("validation.typeRequired")),
    gameSystem: z
      .string()
      .max(100, t("validation.gameSystemMax", { max: 100 }))
      .optional(),
    // Kept as the raw input string; converted to a number on submit ("" = not set)
    maxMembers: z
      .string()
      .regex(/^([1-9]\d*)?$/, t("validation.maxMembersWhole")),
    expAwarded: storyRewardSchema(t, t("validation.rewardLabelExp"), locale),
    pointAwarded: storyRewardSchema(t, t("validation.rewardLabelGold"), locale),
    // datetime-local input value ("" = not set)
    startAt: z.string(),
    locationType: z.nativeEnum(
      StoryLocationTypeEnum,
      t("validation.locationTypeRequired"),
    ),
    locationDetail: z
      .string(t("validation.locationDetailRequired"))
      .min(1, t("validation.locationDetailRequired")),
    // Optional https links ("" = not set)
    locationLink: createStoryLocationLinkSchema({
      maxLength: t("validation.locationLinkMax", {
        max: STORY_LINK_MAX_LENGTH,
      }),
      httpsRequired: t("validation.locationLinkHttps"),
    }),
    discordChannelLink: createStoryDiscordChannelLinkSchema({
      maxLength: t("validation.discordLinkMax", {
        max: STORY_LINK_MAX_LENGTH,
      }),
      httpsRequired: t("validation.discordLinkHttps"),
    }),
    feedbackFormLink: createStoryFeedbackFormLinkSchema({
      maxLength: t("validation.feedbackLinkMax", {
        max: STORY_LINK_MAX_LENGTH,
      }),
      httpsRequired: t("validation.feedbackLinkHttps"),
    }),
  });
}

export type TStoryCreateFormSchema = z.infer<
  ReturnType<typeof createStoryCreateFormSchema>
>;
