import * as z from "zod";

import type { TSwitchRoleTranslate } from "@/app/(authenticated)/switch-role/_types/switch-role-translate";

export function createSwitchFormSchema(t: TSwitchRoleTranslate) {
  return z.object({
    role: z.string().min(1, t("validation.roleRequired")),
  });
}

export type TSwitchFormSchema = z.infer<
  ReturnType<typeof createSwitchFormSchema>
>;
