import { TRoleEntity } from "@/api/main/types/entities/iam/role-entity";

export type TUserMeResponse = {
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
