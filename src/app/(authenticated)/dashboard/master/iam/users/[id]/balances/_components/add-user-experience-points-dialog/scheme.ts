import * as z from "zod";

import { UserExpLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-type";

const amountSchema = z
  .string()
  .regex(/^[1-9]\d*$/, "Amount must be a whole number of at least 1")
  .refine(
    (value) => Number(value) <= 2_147_483_647,
    "Amount must be at most 2,147,483,647",
  );

export const AddUserExperiencePointsFormSchema = z.object({
  type: z.nativeEnum(UserExpLogTypeEnum, "Type is required"),
  amount: amountSchema,
  description: z.string(),
});

export type TAddUserExperiencePointsFormSchema = z.infer<
  typeof AddUserExperiencePointsFormSchema
>;
