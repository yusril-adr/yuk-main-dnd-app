import * as z from "zod";

import type { TSettingsTranslate } from "@/app/(authenticated)/settings/_types/settings-translate";

export function createSettingsProfileFormSchema(t: TSettingsTranslate) {
  return z.object({
    email: z
      .string()
      .min(1, t("validation.emailRequired"))
      .email(t("validation.emailInvalid")),
    username: z.string().max(50, t("validation.usernameMax", { max: 50 })),
    displayName: z
      .string()
      .min(1, t("validation.displayNameRequired"))
      .max(100, t("validation.displayNameMax", { max: 100 })),
    bio: z.string().max(50, t("validation.bioMax", { max: 50 })),
    avatarFileId: z.string(),
  });
}

export type TSettingsProfileFormSchema = z.infer<
  ReturnType<typeof createSettingsProfileFormSchema>
>;
