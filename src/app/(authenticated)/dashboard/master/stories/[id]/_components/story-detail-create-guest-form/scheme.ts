import * as z from "zod";

import type { TStoryDetailCreateGuestTranslate } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-create-guest-translate";

export function createStoryDetailCreateGuestFormSchema(
  t: TStoryDetailCreateGuestTranslate,
) {
  return z.object({
    username: z
      .string(t("createGuest.validation.usernameRequired"))
      .min(1, t("createGuest.validation.usernameRequired"))
      .regex(/^\S*$/, t("createGuest.validation.usernameNoSpaces"))
      .max(50, t("createGuest.validation.usernameMax", { max: 50 })),
    displayName: z
      .string(t("createGuest.validation.displayNameRequired"))
      .min(1, t("createGuest.validation.displayNameRequired"))
      .regex(/\S/, t("createGuest.validation.displayNameRequired"))
      .max(100, t("createGuest.validation.displayNameMax", { max: 100 })),
  });
}

export type TStoryDetailCreateGuestFormSchema = z.infer<
  ReturnType<typeof createStoryDetailCreateGuestFormSchema>
>;
