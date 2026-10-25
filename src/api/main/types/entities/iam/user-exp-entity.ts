import { UserExpLogDirectionEnum } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-direction";
import { UserExpLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-type";
import { TBaseEntity } from "../base-entity";

export type TUserExpEntity = TBaseEntity & {
  amount: number;
  type: UserExpLogTypeEnum;
  // 1 increment adds amount, 2 decrement subtracts it; amount is always positive
  direction: UserExpLogDirectionEnum;
  description: string | null;
};
