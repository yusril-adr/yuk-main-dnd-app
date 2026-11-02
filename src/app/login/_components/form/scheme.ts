import * as z from "zod";

import type { TLoginTranslate } from "@/app/login/_types/login-translate";

export function createLoginFormSchema(t: TLoginTranslate) {
  return z.object({
    identifier: z.string().min(1, t("validation.identifierRequired")),
    password: z.string().min(1, t("validation.passwordRequired")),
  });
}

export type TLoginFormSchema = z.infer<
  ReturnType<typeof createLoginFormSchema>
>;
