import { TRoleEntity } from "./role-entity";

export type TUserEntity = {
  id: string;
  username?: string;
  email: string;
  display_name: string;
  avatarUrl?: string;
  bio?: string;
  playerExp: number;
  playerLevel: number;
  dmExp: number;
  dmLevel: number;
  points: number;
  roles?: TRoleEntity[];
  createdAt: string;
  updatedAt: string;
};
