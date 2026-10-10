import type { UserPointLogTypeEnum } from "../enums/user-point-log-type";

export type TUserPointResponse = {
  id: string;
  amount: number;
  type: UserPointLogTypeEnum;
  description: string | null;
  created_at: string;
  updated_at: string;
};
