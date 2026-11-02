import * as z from "zod";

import type { TSettingsTranslate } from "@/app/(authenticated)/settings/_types/settings-translate";

// Mirrors class-validator @IsStrongPassword() defaults
function strongPassword(t: TSettingsTranslate) {
  return z
    .string()
    .min(8, t("validation.passwordMin", { min: 8 }))
    .regex(/[a-z]/, t("validation.passwordLowercase"))
    .regex(/[A-Z]/, t("validation.passwordUppercase"))
    .regex(/\d/, t("validation.passwordNumber"))
    .regex(/[^A-Za-z0-9]/, t("validation.passwordSymbol"));
}

export function createSettingsPasswordFormSchema(t: TSettingsTranslate) {
  return z
    .object({
      currentPassword: z
        .string()
        .min(1, t("validation.currentPasswordRequired")),
      newPassword: strongPassword(t),
      newPasswordConfirmation: z
        .string()
        .min(1, t("validation.confirmPasswordRequired")),
    })
    .refine((value) => value.newPassword === value.newPasswordConfirmation, {
      message: t("validation.passwordsMismatch"),
      path: ["newPasswordConfirmation"],
    });
}

export type TSettingsPasswordFormSchema = z.infer<
  ReturnType<typeof createSettingsPasswordFormSchema>
>;
