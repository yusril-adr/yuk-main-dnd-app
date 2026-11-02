import * as z from "zod";

import type { TRoleEditTranslate } from "@/app/(authenticated)/dashboard/master/iam/roles/[id]/edit/_types/role-edit-translate";

export function createRoleEditFormSchema(t: TRoleEditTranslate) {
  return z.object({
    name: z
      .string(t("validation.nameRequired"))
      .min(1, t("validation.nameRequired"))
      .max(100, t("validation.nameMax", { max: 100 }))
      .regex(/[A-Za-z0-9]/, t("validation.nameAlphanumeric")),
    description: z.string().optional(),
    isShowInPublic: z.boolean(),
    permissionIds: z.array(z.string()),
  });
}

export type TRoleEditFormSchema = z.infer<
  ReturnType<typeof createRoleEditFormSchema>
>;
