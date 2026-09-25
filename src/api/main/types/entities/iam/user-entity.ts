import { TBaseEntity } from "./base-entity";
import { TRoleEntity } from "./role-entity";

export type TUserEntity = TBaseEntity & {
  username?: string;
  email: string;
  display_name: string;
  avatar_url?: string;
  bio?: string;
  player_exp: number;
  player_level: number;
  dm_exp: number;
  dm_level: number;
  points: number;
  roles?: TRoleEntity[];
};
