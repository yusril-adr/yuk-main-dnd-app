import { UserPointLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/points/enums/user-point-log-type";
import { TBaseEntity } from "../base-entity";

export type TUserPointEntity = TBaseEntity & {
  amount: number;
  type: UserPointLogTypeEnum;
  description: string | null;
};
