import { TUserEntity } from "@/api/main/types/entities/iam/user-entity";

export type TUserMeResponse = TUserEntity & {
  selected_role: string | null;
  permissions: string[];
};
