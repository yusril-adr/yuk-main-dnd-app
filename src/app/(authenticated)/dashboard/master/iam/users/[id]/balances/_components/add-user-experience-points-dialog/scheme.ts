import * as z from "zod";

import { UserExpLogDirectionEnum } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-direction";
import { UserExpLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-type";

import type { TUsersBalancesTranslate } from "@/app/(authenticated)/dashboard/master/iam/users/[id]/balances/_types/users-balances-translate";

export function createAddUserExperiencePointsFormSchema(
  t: TUsersBalancesTranslate,
) {
  const amountSchema = z
    .string()
    .regex(/^[1-9]\d*$/, t("validation.amountWhole"))
    .refine(
      (value) => Number(value) <= 2_147_483_647,
      t("validation.amountMax", { max: "2,147,483,647" }),
    );

  return z.object({
    type: z.nativeEnum(UserExpLogTypeEnum, t("validation.typeRequired")),
    direction: z.nativeEnum(
      UserExpLogDirectionEnum,
      t("validation.directionRequired"),
    ),
    amount: amountSchema,
    description: z.string(),
  });
}

export type TAddUserExperiencePointsFormSchema = z.infer<
  ReturnType<typeof createAddUserExperiencePointsFormSchema>
>;
