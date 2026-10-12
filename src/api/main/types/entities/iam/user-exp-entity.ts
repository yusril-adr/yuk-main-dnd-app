import { UserExpLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-type";
import { TBaseEntity } from "../base-entity";

export type TUserExpEntity = TBaseEntity & {
  amount: number;
  type: UserExpLogTypeEnum;
  description: string | null;
};
