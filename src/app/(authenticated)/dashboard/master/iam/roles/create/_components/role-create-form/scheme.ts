import * as z from "zod";

import type { TRoleCreateTranslate } from "@/app/(authenticated)/dashboard/master/iam/roles/create/_types/role-create-translate";

export function createRoleCreateFormSchema(t: TRoleCreateTranslate) {
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

export type TRoleCreateFormSchema = z.infer<
  ReturnType<typeof createRoleCreateFormSchema>
>;
