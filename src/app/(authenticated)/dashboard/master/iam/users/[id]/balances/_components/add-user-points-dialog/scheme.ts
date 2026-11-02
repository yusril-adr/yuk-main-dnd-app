import * as z from "zod";

import { UserPointLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/points/enums/user-point-log-type";

import type { TUsersBalancesTranslate } from "@/app/(authenticated)/dashboard/master/iam/users/[id]/balances/_types/users-balances-translate";

export function createAddUserPointsFormSchema(t: TUsersBalancesTranslate) {
  const amountSchema = z
    .string()
    .regex(/^[1-9]\d*$/, t("validation.amountWhole"))
    .refine(
      (value) => Number(value) <= 2_147_483_647,
      t("validation.amountMax", { max: "2,147,483,647" }),
    );

  return z.object({
    type: z.nativeEnum(UserPointLogTypeEnum, t("validation.typeRequired")),
    amount: amountSchema,
    description: z.string(),
  });
}

export type TAddUserPointsFormSchema = z.infer<
  ReturnType<typeof createAddUserPointsFormSchema>
>;
