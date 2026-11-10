import type { EventMemberStatusEnum } from "@/api/main/modules/master/events/enums/event-member-status";
import type { TBaseEntity } from "../base-entity";
import type { TUserEntity } from "../iam/user-entity";

export type TEventMemberEntity = TBaseEntity & {
  user: TUserEntity;
  status: EventMemberStatusEnum;
};
