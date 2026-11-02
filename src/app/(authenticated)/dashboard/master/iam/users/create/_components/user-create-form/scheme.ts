import * as z from "zod";

import type { TUserCreateTranslate } from "@/app/(authenticated)/dashboard/master/iam/users/create/_types/user-create-translate";

export function createUserCreateFormSchema(t: TUserCreateTranslate) {
  return z.object({
    email: z
      .string(t("validation.emailRequired"))
      .min(1, t("validation.emailRequired"))
      .email(t("validation.emailInvalid")),
    password: z
      .string(t("validation.passwordRequired"))
      .min(1, t("validation.passwordRequired"))
      .min(8, t("validation.passwordMin", { min: 8 })),
    username: z
      .string()
      .regex(/^\S*$/, t("validation.usernameNoSpaces"))
      .optional(),
    displayName: z
      .string(t("validation.displayNameRequired"))
      .min(1, t("validation.displayNameRequired")),
    avatarFileId: z.string().optional(),
    bio: z.string().max(50, t("validation.bioMax", { max: 50 })).optional(),
    roleIds: z.array(z.string()).min(1, t("validation.rolesRequired")),
  });
}

export type TUserCreateFormSchema = z.infer<
  ReturnType<typeof createUserCreateFormSchema>
>;
