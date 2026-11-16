import * as z from "zod";

import type { TEventDetailCreateGuestTranslate } from "@/app/(authenticated)/dashboard/master/events/[id]/_types/event-detail-create-guest-translate";

export function createEventDetailCreateGuestFormSchema(
  t: TEventDetailCreateGuestTranslate,
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

export type TEventDetailCreateGuestFormSchema = z.infer<
  ReturnType<typeof createEventDetailCreateGuestFormSchema>
>;
