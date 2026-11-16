import * as z from "zod";

import { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";
import { countRichTextCharacters } from "@/utils/rich-text";
import { EVENT_DESCRIPTION_MAX_LENGTH } from "@/app/(authenticated)/dashboard/master/events/_constants/event-description";
import { EVENT_REWARD_MAX } from "@/app/(authenticated)/dashboard/master/events/_constants/event-reward";
import { EVENT_LINK_MAX_LENGTH } from "@/app/(authenticated)/dashboard/master/events/_constants/event-link";
import {
  createEventLocationLinkSchema,
  createEventFeedbackFormLinkSchema,
} from "@/app/(authenticated)/dashboard/master/events/_utils/event-link";
import type { TEventEditTranslate } from "@/app/(authenticated)/dashboard/master/events/[id]/edit/_types/event-edit-translate";

// Kept as the raw input string ("" = 0); whole number between 0 and the DB max
function eventRewardSchema(
  t: TEventEditTranslate,
  label: string,
  locale: string,
) {
  return z
    .string()
    .regex(/^\d*$/, t("validation.rewardWhole", { label }))
    .refine(
      (value) => !value || Number(value) <= EVENT_REWARD_MAX,
      t("validation.rewardMax", {
        label,
        max: EVENT_REWARD_MAX.toLocaleString(locale),
      }),
    );
}

export function createEventEditFormSchema(
  t: TEventEditTranslate,
  locale: string = "en-US",
) {
  return z.object({
    // Newly uploaded banner file id ("" = unchanged or removed)
    bannerFileId: z.string(),
    // The existing banner was removed: sent as banner_file_id: null
    isBannerRemoved: z.boolean(),
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
          countRichTextCharacters(value) <= EVENT_DESCRIPTION_MAX_LENGTH,
        t("validation.descriptionMax", { max: EVENT_DESCRIPTION_MAX_LENGTH }),
      )
      .optional(),
    // Kept as the raw input string; converted to a number on submit ("" = not set)
    maxMembers: z
      .string()
      .regex(/^([1-9]\d*)?$/, t("validation.maxMembersWhole")),
    expAwarded: eventRewardSchema(t, t("validation.rewardLabelExp"), locale),
    pointAwarded: eventRewardSchema(t, t("validation.rewardLabelGold"), locale),
    // datetime-local input value ("" = not set)
    startAt: z.string(),
    locationType: z.nativeEnum(
      EventLocationTypeEnum,
      t("validation.locationTypeRequired"),
    ),
    locationDetail: z
      .string(t("validation.locationDetailRequired"))
      .min(1, t("validation.locationDetailRequired")),
    // Optional https links ("" = not set)
    locationLink: createEventLocationLinkSchema({
      maxLength: t("validation.locationLinkMax", {
        max: EVENT_LINK_MAX_LENGTH,
      }),
      httpsRequired: t("validation.locationLinkHttps"),
    }),
    feedbackFormLink: createEventFeedbackFormLinkSchema({
      maxLength: t("validation.feedbackLinkMax", {
        max: EVENT_LINK_MAX_LENGTH,
      }),
      httpsRequired: t("validation.feedbackLinkHttps"),
    }),
  });
}

export type TEventEditFormSchema = z.infer<
  ReturnType<typeof createEventEditFormSchema>
>;
