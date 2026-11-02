import * as z from "zod";

import type { TUserEditTranslate } from "@/app/(authenticated)/dashboard/master/iam/users/[id]/edit/_types/user-edit-translate";

export function createUserEditFormSchema(t: TUserEditTranslate) {
  return z.object({
    email: z
      .string(t("validation.emailRequired"))
      .min(1, t("validation.emailRequired"))
      .email(t("validation.emailInvalid")),
    password: z
      .string()
      .min(8, t("validation.passwordMin", { min: 8 }))
      .optional()
      .or(z.literal("")),
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

export type TUserEditFormSchema = z.infer<
  ReturnType<typeof createUserEditFormSchema>
>;
