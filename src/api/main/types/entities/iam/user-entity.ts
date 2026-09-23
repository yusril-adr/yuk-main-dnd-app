import { TRoleEntity } from "./role-entity";

export type TUserEntity = {
  id: string;
  username?: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  playerExp: number;
  playerLevel: number;
  dmExp: number;
  dmLevel: number;
  roles?: TRoleEntity[];
  createdAt: string;
  updatedAt: string;
};
