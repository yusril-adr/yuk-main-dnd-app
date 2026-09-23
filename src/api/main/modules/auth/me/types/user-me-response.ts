import { TUserEntity } from "@/api/main/types/entities/iam/user-entity";

export type TUserMeResponse = TUserEntity & {
  selectedRole: string | null;
  permissions: string[];
};
