import type { UserExpLogTypeEnum } from "../enums/user-exp-log-type";

export type TUserExperiencePointResponse = {
  id: string;
  amount: number;
  type: UserExpLogTypeEnum;
  description: string | null;
  created_at: string;
  updated_at: string;
};
